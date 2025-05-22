import { HttpCode, HttpError } from "./erro.config";

export class EventNotFoundError extends HttpError {
    constructor(message: string = 'Mutirão não encontrado') {
        super({ status: HttpCode.NOT_FOUND, message });
    }
}

export class UnauthorizedEventAccessError extends HttpError {
    constructor(message: string = 'Você não tem permissão para acessar este mutirão') {
        super({ status: HttpCode.FORBIDDEN, message });
    }
}