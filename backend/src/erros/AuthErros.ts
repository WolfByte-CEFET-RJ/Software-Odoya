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

/**
 * @extends HttpError
 * @description Autenticação não realizada previamente
 */
export class AuthenticationError extends HttpError {
    constructor(message: string 
            = "Autenticação não realizada.") {
        super({ status: HttpCode.UNAUTHORIZED, message });
    }
}

/**
 * @extends HttpError
 * @description Acesso não autorizado ao recurso
 */
export class AccessDeniedError extends HttpError {
    constructor(message: string 
            = "Acesso negado. Nivel de permissão insuficiente.") {
        super({ status: HttpCode.FORBIDDEN, message });
    }
}

/**
 * @extends HttpError
 * @description Valor da Flag invalido
 */
export class WrongFlag extends HttpError {
    constructor(message: string 
            = "O valor da Flag é invalido") {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}