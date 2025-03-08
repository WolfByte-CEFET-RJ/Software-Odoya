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