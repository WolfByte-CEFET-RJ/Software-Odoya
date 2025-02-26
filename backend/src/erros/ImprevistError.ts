import { HttpCode, HttpError } from "./erro.config";

/**
 * @extends HttpError
 * @description Erro não previsto. Deve ser chamado após outras verificaçãoes de resposta, por ser genérico.
 */
export class ImprevistError extends HttpError{
    constructor(message: string 
            = 'Um erro inesperado ao processar a solicitação. Verifique o log do sistema para mais detalhes.'){

        super({status: HttpCode.INTERNAL_SERVER_ERROR, message})

    }
}