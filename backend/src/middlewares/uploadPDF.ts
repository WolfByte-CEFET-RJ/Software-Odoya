import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import { FileExtensionError } from '../erros/FileError';

/**
 * @class
 * Centraliza o upload de arquivos pdf com multer
 */
class UploadPdfConfig {
  private static storage: StorageEngine = multer.memoryStorage();

  private static fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const allowedMimeTypes =  ['application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new FileExtensionError('Apenas arquivos PDF são permitidos!'));
    }
  }

  /**
   * @returns {multer.Multer} Instância do multer configurada
   */
  public static getUploader() {
    return multer({
      storage: this.storage,
      fileFilter: this.fileFilter
    });
  }
}

export default UploadPdfConfig;
