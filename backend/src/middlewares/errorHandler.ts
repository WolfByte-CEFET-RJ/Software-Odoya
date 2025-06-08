import { Request, Response, NextFunction } from "express"
import { HttpCode, HttpError } from "../erros/erro.config"
import { ValidationError } from "yup";
import { ImprevistError } from "../erros/ImprevistError";

/**
 * @class
 * @description Centralizador de erros
 */
export default class ErrorHandler{

    /**
     * @method sendError
     * @description Processa e envia respostas de erro
     */
    public static sendError(e: Error, req: Request, res: Response, next: NextFunction): void{

        let handledError = e;
        console.error(handledError)

        if(e instanceof ValidationError){
            handledError = new HttpError({status: HttpCode.BAD_REQUEST, message: e.errors.join(" / ")})
        }

        else if(!(e instanceof HttpError)) {
            handledError = new ImprevistError()
        }

        return (handledError as HttpError).sendMessage(res);
    }

    /**
     * @method handleNotFound
     * @description Porcessa erro 404
     */
    public static handleNotFound(req: Request, res: Response, next: NextFunction): void{
        throw new HttpError({status: HttpCode.NOT_FOUND, message: `${req.method+" "+req.path} não é um caminho definido.`})
    }

}