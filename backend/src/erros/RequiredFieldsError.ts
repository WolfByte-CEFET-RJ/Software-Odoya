import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro lançado quando campos obrigatórios não são fornecidos.
 */
export class RequiredFieldsError extends HttpError {
    constructor(message: string = 'Campos obrigatórios não foram fornecidos.') {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}