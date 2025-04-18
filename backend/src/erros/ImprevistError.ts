<<<<<<< HEAD
import { HttpCode, HttpError } from "./erro.config"
=======
import { HttpCode, HttpError } from "./erro.config";
>>>>>>> aecc7c1a1bc0e338f329bf24105459e11fb84a53

/**
 * @extends HttpError
 * @description Erro que não pôde ser previsto. Deve ser lançado após outras verificações de resposta, por ser genérico.
 */
export class ImprevistError extends HttpError{
    constructor(message: string 
            = 'Um erro inesperado ao processar a solicitação. Verifique o log do sistema para mais detalhes.'){

        super({status: HttpCode.INTERNAL_SERVER_ERROR, message})

    }
}