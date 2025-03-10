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
 * @description Erro lançado quando campos obrigatórios não são fornecidos.
 */
export class RequiredFieldsError extends HttpError {
    constructor(message: string = 'Campos obrigatórios não foram fornecidos.') {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}