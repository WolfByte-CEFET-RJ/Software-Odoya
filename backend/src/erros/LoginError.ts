import { HttpError, HttpCode } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro lançado quando o email fornecido não está cadastrado.
 */
export class InvalidCredentialsError extends HttpError {
    constructor(message: string = 'Credenciais inválidas. Verifique o email e senha.') {
        super({ status: HttpCode.UNAUTHORIZED, message });
    }
}

/**
 * @extends HttpError
 * @description Erro lançado quando o token de validação de serviços terceiros não é bem sucedida 
 */
export class InvalidExternalToken extends HttpError {
    constructor(status: HttpCode = HttpCode.UNAUTHORIZED, message: string = "Token inválido ou usuário sem informações necessárias associadas.") {
        super({ status, message });
    }
}

/**
 * @extends HttpError
 * @description Erro lançado quando o token de validação de serviços terceiros não é bem sucedida 
 */
export class ExternalAuthRequired extends HttpError {
    constructor(message: string = "Esse perfil só aceita login com serviços externos. Altere sua senha para logar normalmente") {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}