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
 * @description Erro de Usuário não Encontrado
 */
export class UserNotFound extends HttpError{
    constructor(message: string 
            = 'Usuário não Encontrado'){

        super({status: HttpCode.NOT_FOUND, message})

    }
}

/**
 * @extends HttpError
 * @description Erro de id não inserido
 */
export class RequiredIdError extends HttpError {
    constructor(
        message: string = 'Id não fornecido'
    ){
        super({status: HttpCode.BAD_REQUEST, message});
    }
}