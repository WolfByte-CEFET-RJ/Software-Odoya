import { HttpCode, HttpError } from "./erro.config"

/**
 * @extends HttpError
 * @description Usuário especificado não pôde ser encontardo no banco de dados
 */
export class UserNotFound extends HttpError{
    constructor(message: string 
            = 'Usuário não encontrado!'){
        super({status: HttpCode.NOT_FOUND, message})
    }
}