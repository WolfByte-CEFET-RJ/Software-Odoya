import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro nenhuma entrada encontrada
 */
export class RegistrationNotFound extends HttpError{
    constructor(message: string 
            = 'nenhum registro encontrado'){

        super({status: HttpCode.NOT_FOUND, message})

    }
}