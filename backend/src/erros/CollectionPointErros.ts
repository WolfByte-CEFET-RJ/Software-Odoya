import { HttpCode, HttpError } from "./erro.config";

export class CollectionPointNotFound extends HttpError{
    constructor(message: string = 'Ponto de Coleta não Encontrado'){

        super({status: HttpCode.NOT_FOUND, message})

    }
}

export class RequiredFieldsError extends HttpError {
    constructor(message: string = 'Nome ou local do ponto de coleta não foi fornecido') {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}

/**
 * @extends HttpError
 * @description Erro lançado quando há tentativa de excluir um ponto de coleta que possui depósitos associados
 */
export class CollectionPointWithDepositsError extends HttpError {
    constructor(message: string = 'Não é possível excluir um ponto de coleta que possui depósitos associados') {
        super({ status: HttpCode.CONFLICT, message });
    }
}

/**
 * @extends HttpError
 * @description Erro de id de ponto de coleta não fornecido
 */
export class RequiredCollectionPointIdError extends HttpError {
    constructor(
        message: string = 'Id de ponto de coleta não fornecido'
    ){
        super({status: HttpCode.BAD_REQUEST, message});
    }
}

/**
 * @extends HttpError
 * @description Erro de id de ponto de coleta não fornecido
 */
export class RequiredDataError extends HttpError {
    constructor(
        message: string = 'Dados para update não fornecidos.'
    ){
        super({status: HttpCode.BAD_REQUEST, message});
    }
}
