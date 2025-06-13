import { HttpCode, HttpError } from "./erro.config"

// Recomenda-se especificação da mensagem no lançamanto desses erros 

/**
 * @extends HttpError
 * @description Dado necessário não inserido
 */
export class MissinngDataError extends HttpError{
    constructor(message: string 
            = 'Dado necessário não fornecido para processamento'){

        super({status: HttpCode.BAD_REQUEST, message})

    }
}

/**
 * @extends HttpError
 * @description Dado necessário não inserido
 */
export class InvalidSearch extends HttpError{
    constructor(message: string 
            = 'Parâmetros de busca inválidos'){

        super({status: HttpCode.BAD_REQUEST, message})

    }
}
