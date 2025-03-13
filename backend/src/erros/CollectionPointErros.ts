import { HttpCode, HttpError } from "./erro.config";

export class CollectionPointNotFound extends HttpError{
    constructor(message: string 
            = 'Ponto de Coleta não Encontrado'){

        super({status: HttpCode.NOT_FOUND, message})

    }
}