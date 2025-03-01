import { HttpCode, HttpError } from "./erro.config"

/**
 * @extends HttpError
 * @description Não é permitido alterar permissões do usuário root.
 */
export class RootUserModificationError extends HttpError {
    constructor(message: string 
            = "Super-usuário não pode ter informações críticas alteradas") {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}

export class AuthenticationError extends HttpError {
    constructor(message: string 
            = "Autenticação não realizada.") {
        super({ status: HttpCode.UNAUTHORIZED, message });
    }
}

export class AccessDeniedError extends HttpError {
    constructor(message: string 
            = "Acesso negado. Nivel de permissão insuficiente.") {
        super({ status: HttpCode.FORBIDDEN, message });
    }
}
