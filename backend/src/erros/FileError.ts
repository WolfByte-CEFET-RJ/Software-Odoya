import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro de upload do arquivo
 */
export class UploadError extends HttpError{
    constructor(message: string 
            = 'Erro ao fazer upload do arquivo.'){

        super({status: HttpCode.INTERNAL_SERVER_ERROR, message})
    }
}

/**
 * @extends HttpError
 * @description Extensão do arquivo não suportada
 */
export class FileExtensionError extends HttpError{
    constructor(message: string 
            = 'Extensão do arquivo inválida'){

        super({status: HttpCode.BAD_REQUEST, message})

    }
}