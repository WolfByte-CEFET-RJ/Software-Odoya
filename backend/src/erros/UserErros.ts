import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro de Email duplicado (já em uso) no BD
 */
export class EmailDuplicate extends HttpError{
    constructor(message: string 
            = 'Email já em uso'){

        super({status: HttpCode.CONFLICT, message})

    }
}