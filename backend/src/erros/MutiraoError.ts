import { HttpCode, HttpError } from "../erros/erro.config";

export class MutiraoNotFoundError extends HttpError {
    constructor(message: string = 'Mutirão não encontrado') {
        super({ status: HttpCode.NOT_FOUND, message });
    }
}

export class UnauthorizedMutiraoAccessError extends HttpError {
    constructor(message: string = 'Você não tem permissão para acessar este mutirão') {
        super({ status: HttpCode.FORBIDDEN, message });
    }
}