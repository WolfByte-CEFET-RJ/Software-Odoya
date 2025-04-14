import { HttpCode, HttpError } from "./erro.config";

export class DepositNotFoundError extends HttpError {
    constructor(message: string = 'Depósito não encontrado') {
        super({ status: HttpCode.NOT_FOUND, message });
    }
}

export class UnauthorizedDepositAccessError extends HttpError {
    constructor(message: string = 'Você não tem permissão para acessar este depósito') {
        super({ status: HttpCode.FORBIDDEN, message });
    }
}