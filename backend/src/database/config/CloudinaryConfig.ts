import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class
 * Concentra as configurações e credenciais do Cloudinary
 */
class CloudinaryConfig {
  private static configured: boolean = false;

  /**
   * Aplica a configuração global do Cloudinary se ainda não estiver configurado
   */
  private static configure(): void {
    if (!this.configured) {
      const config: ConfigOptions = {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      };

      cloudinary.config(config);
      this.configured = true;
    }
  }

  /**
   * Retorna a instância configurada do Cloudinary
   */
  public static getInstance() {
    this.configure();
    return cloudinary;
  }

  /**
   * Retorna um uploader configurado do Cloudinary
   */
  public static getUploader() {
    return (this.getInstance()).uploader
  }
}

export default CloudinaryConfig;
