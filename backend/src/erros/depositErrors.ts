import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro de collection point não Encontrado
 */
export class CollectionPointNotFound extends HttpError{
    constructor(message: string 
            = 'Ponto de coleta não Encontrado'){
        super({status: HttpCode.NOT_FOUND, message})

    }
}