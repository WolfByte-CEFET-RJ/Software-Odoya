import { HttpCode, HttpError } from "./erro.config";

export class CollectionPointNotFound extends HttpError{
    constructor(message: string = 'Ponto de Coleta não Encontrado'){

        super({status: HttpCode.NOT_FOUND, message})

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
 * @description Erro ao buscar localização geográfica do ponto de coleta
 */
export class GeocodeError extends HttpError {
    constructor(message: string = 'Erro ao buscar localização geográfica do ponto de coleta') {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}
