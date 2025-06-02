import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import { FileExtensionError } from '../erros/FileError';

class UploadImageConfig {
  private static storage: StorageEngine = multer.memoryStorage();

  private static fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new FileExtensionError('Apenas arquivos PNG, JPEG e JPG são permitidos!'));
    }
  }

  public static getUploader() {
    return multer({
      storage: this.storage,
      fileFilter: this.fileFilter
    });
  }
}

export default UploadImageConfig;
