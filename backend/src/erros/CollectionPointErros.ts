import { HttpCode, HttpError } from "./erro.config";

export class CollectionPointNotFound extends HttpError{
    constructor(message: string = 'Ponto de Coleta não Encontrado'){

        super({status: HttpCode.NOT_FOUND, message})

    }
}

export class RequiredFieldsError extends HttpError {
    constructor(message: string = 'Nome ou local do ponto de coleta não foi fornecido') {
        super({ status: HttpCode.BAD_REQUEST, message });
    }
}