import CloudinaryConfig from "../database/config/CloudinaryConfig";
import streamifier from "streamifier";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
import { fileTypeFromBuffer } from "file-type";
import { FileExtensionError, UploadError } from "../erros/FileError";

dotenv.config();

interface UploadStrategy {
  /**
   * Faz o upload de uma imagem a partir de um buffer
   * @param buffer Buffer com os dados da imagem
   * @param system_id Identificador único da entidade associado a imagem
   * @returns {Promise<string>} Caminho da imagem
   */
  uploadImage: (buffer: Buffer, system_id: string) => Promise<string>
}

/**
 * @class
 * Lida com uploads e requisiçãoes de imagens da nuvem do Cloudinary
 */
class CloudinaryStrategy implements UploadStrategy {

  public async uploadImage(buffer: Buffer, system_id: string): Promise<string> {
    
    const uploader = CloudinaryConfig.getUploader();

    const streamUpload = (): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {

        const stream = uploader.upload_stream(
          { public_id: system_id },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {

            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    try {
      const {secure_url} = await streamUpload();
      return secure_url;

    } catch (error: any) {
      console.log(error)
      throw new UploadError("Falha no upload da imagem. " + error.message);
    }
  }
}

/**
 * @class
 * Lida com uploads e requisiçãoes de imagens localmente
 */
class LocalStrategy implements UploadStrategy {

public async uploadImage(buffer: Buffer, system_id: string): Promise<string> {
  try {
    const uploadsDir = path.resolve(process.cwd(), "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileType = await fileTypeFromBuffer(buffer);
    if (!fileType?.ext) {
      throw new FileExtensionError("Não foi possível determinar o tipo do arquivo.");
    }

    const fileName = `${system_id}.${fileType.ext}`;
    const filePath = path.join(uploadsDir, fileName);

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, buffer, (err) => {
        if(err){ 
          return reject(new UploadError());
        }

        resolve(`http://localhost:${process.env.PORT}/uploads/${fileName}`);
      });
    });

  } catch (error: any) {
    console.log(error);
    throw new UploadError("Falha no upload da imagem. " + error.message);
  }
}

}

export default class FileService {
  private static strategy: UploadStrategy;

  /**
  * Configura a estratégia de upload estática
  * @param strategy A estratégia que será usada para o upload. Caso NULL, analisa o ambiente
  */
  public static setStrategy(strategy: UploadStrategy | null): void {

    if(strategy){
      this.strategy = strategy
      return
    }

    // Se a estratégia não for explícita, controla pelo ambiente de execução 
    if (process.env.NODE_ENV === "production") {
      this.strategy = new CloudinaryStrategy();
    } else {
      this.strategy = new LocalStrategy();
    }
  }

  /**
   * Realiza o upload de uma imagem com a estratégia definida
   * @param buffer Buffer da imagem
   * @param system_id Nome do arquivo ou ID único
   * @returns Caminho ou URL da imagem
   */
  public static async upload(buffer: Buffer, system_id: string): Promise<string> {
    if (!this.strategy) {
      this.setStrategy(null)
      console.log("Estratégia não definida explicitamente. Analisando ambiente...")
    }

    return this.strategy.uploadImage(buffer, system_id);
  }
}

