import { HttpError, HttpCode } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro lançado quando há mais de duas newsletter em um mês
 */
export class NewsMonthLimitError extends HttpError {
    constructor(message: string = 'Limite de 2 newsletters por mês atingido!') {
        super({ status: HttpCode.UNAUTHORIZED, message });
    }
}

/**
 * @extends HttpError
 * @description Erro lançado quando não é possível encontrar uma newsletter
 */
export class NewsNotFound extends HttpError {
    constructor(message: string = 'Newsletter não encontrada') {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}
