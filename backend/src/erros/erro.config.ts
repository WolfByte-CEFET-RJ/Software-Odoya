/**
 * @file Configurações base do tratamento de erro
 */

import { Response } from "express";

/**
 * @enum {number} number
 * @description Fornece os códigos de status http
 */
export enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

/**
 * @interface
 * @description Representa os campos das respostas http quando m erro ocorre
 * @see HttpCode
 */
export interface HttpErrorFields {
    status: HttpCode,
    message: string,
}

/**
 * @class
 * @extends {Error}
 * @description Classe que representa um Error traduzido para respostas http.
 */
export class HttpError extends Error {

    public readonly status: HttpCode;

    /**
     * @param {HttpErrorFields} args Objeto contendo o status code e a mensagem do erro
     */
    constructor({ status, message }: HttpErrorFields){
        
        super(message);
        this.status = status;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

    }

    /**
     * Gera um objeto com os campos do erro pré-processado
     * @returns {HttpErrorFields}
     */
    public toJson(): HttpErrorFields{
        return {
            status: this.status,
            message: this.message,
        }
    }

    /**
     * @description Envia um JSON contendo as informações do erro instanciado como resposta HTTP.
     * @param {Response} express_response Objeto de resposta do Express.
     * @returns {void}
     * 
     * @example
     * async function controllerExample(req: Request, res: Response){
     *  try{
     *      // código
     *  } catch(e){
     *      if(e instanceof HttpError){
     *          return e.sendMessage(res);
     *      }
     *  }
     * }
     */
    public sendMessage(express_response: Response): void{
        express_response.status(this.status).json(this.toJson());
    }

}