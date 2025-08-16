import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro nenhuma entrada encontrada
 */
export class RegistrationNotFound extends HttpError{
    constructor(message: string = 'Usuário não cadastrado no mutirão'){
        super({status: HttpCode.NOT_FOUND, message})
    }
}

export class RegistrationDuplicate extends HttpError{
    constructor(message: string = 'Usuário já cadastrado no mutirão'){
        super({status: HttpCode.CONFLICT, message})
    }
}

export class RegistrationEventAlreadyOccurred  extends HttpError{
    constructor(message: string = 'Não é possível se inscrever em um mutirão que já ocorreu!'){
        super({status: HttpCode.BAD_REQUEST, message})
    }
}