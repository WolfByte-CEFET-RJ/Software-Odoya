import CloudinaryConfig from "../database/config/CloudinaryConfig";
import streamifier from "streamifier";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
import { fileTypeFromBuffer } from "file-type";
import { FileExtensionError, ImageNotFoundError, UploadError } from "../erros/FileError";
import { ImprevistError } from "../erros/ImprevistError";

dotenv.config();

interface UploadStrategy {
  /**
   * Faz o upload de um arquivo a partir de um buffer
   * @param buffer Buffer com os dados do arquivo
   * @param system_id Identificador único da entidade associado ao arquivo
   * @returns {Promise<string>} Caminho do arquivo
   */
  uploadFile: (buffer: Buffer, system_id: string) => Promise<string>

  /**
   * Remove um arquivo
   * Operação não fatal. Erros são registrados, mas não interrompem o fluxo de execução
   * @param system_id Identificador único da entidade associado ao arquivo
   * @returns {Promise<Boolean>} Status da operação
   */
  removeFile: (system_id: string) => Promise<Boolean>
}

/**
 * @class
 * Lida com uploads e requisiçãoes de arquivos da nuvem do Cloudinary
 */
class CloudinaryStrategy implements UploadStrategy {

  public async uploadFile(buffer: Buffer, system_id: string): Promise<string> {
    
    const uploader = CloudinaryConfig.getUploader();

    const fileType = await fileTypeFromBuffer(buffer); 
    const ext = fileType?.ext;
    
    if (!ext) throw new FileExtensionError("Não foi possível determinar o tipo do arquivo.");

    const streamUpload = (): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {

        const stream = uploader.upload_stream(
          { public_id: system_id, resource_type: "raw", format: ext, access_mode: "public" },
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
      throw new UploadError("Falha no upload do arquivo. " + error.message);
    }
  }

  async removeFile(system_id: string): Promise<Boolean> {
    try {
      const result = await CloudinaryConfig.getUploader().destroy(system_id);

      if(!(result.result === "ok")){
        throw new Error(result.result)
      }

      return true;

    } catch (error: any) {

      console.error("Erro ao remover arquivo na nuvem :", error.message);
      console.error(`Identificador buscado: ${system_id}`)
      return false;
    }
  }

}

/**
 * @class
 * Lida com uploads e requisiçãoes de arquivos localmente
 */
class LocalStrategy implements UploadStrategy {

  public async uploadFile(buffer: Buffer, system_id: string): Promise<string> {
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
            return reject(new UploadError(err.message));
          }

          resolve(`http://localhost:${process.env.PORT}/uploads/${fileName}`);
        });
      });

    } catch (error: any) {
      throw new UploadError("Falha no upload do arquivo. " + error.message);
    }
  }

  async removeFile(system_id: string): Promise<Boolean> {
    try {
      const uploadsDir = path.resolve(process.cwd(), "uploads");
      const files = fs.readdirSync(uploadsDir);

      const targetFile = files.find(file => file.startsWith(system_id));
      if (!targetFile){
        throw new ImageNotFoundError()
      };

      const filePath = path.join(uploadsDir, targetFile);
      fs.unlinkSync(filePath);
      return true;
    } catch (error: any) {

      console.error("Erro ao remover arquivo local:", error.message);
      console.error(`Identificador buscado: ${system_id}`)
      return false;
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
    console.log("Estratégia de arquivos não definida explicitamente. Analisando ambiente...") 
    
    if (process.env.NODE_ENV === "production") {
      this.strategy = new CloudinaryStrategy();
    } else {
      this.strategy = new LocalStrategy();
    }
  }

  /**
   * Realiza o upload de um arquivo com a estratégia definida
   * @param buffer Buffer do arquivo
   * @param system_id Nome do arquivo ou ID único
   * @returns Caminho ou URL do arquivo
   */
  public static async upload(buffer: Buffer, system_id: string): Promise<string> {
    if (!this.strategy) {
      this.setStrategy(null)
    }

    return this.strategy.uploadFile(buffer, system_id);
  }

  /**
   * Remove um arquivo armazenado.
   * Mudar de ambiente entre os testes pode causar inconsistência
   * @param system_id Nome do arquivo ou ID único
   * @returns Status da remoção
   */
  public static async remove(system_id: string): Promise<Boolean> {
    console.log("Removendo arquivo: " + system_id)

    if (!this.strategy) {
      this.setStrategy(null)
    }

    return this.strategy.removeFile(system_id);
  }
}
