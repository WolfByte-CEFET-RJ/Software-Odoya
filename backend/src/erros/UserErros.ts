import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro de Email duplicado (já em uso) no BD
 */
export class EmailDuplicate extends HttpError{
    constructor(message: string 
            = 'Email já em uso'){

        super({status: HttpCode.CONFLICT, message})

    }
}

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