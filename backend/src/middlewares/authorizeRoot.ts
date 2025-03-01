// REFATORAR PARA MODELO DE CLASSES
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../erros/erro.config";
import { ImprevistError } from "../erros/ImprevistError";
import { AccessDeniedError, AuthenticationError } from "../erros/AuthErros";

dotenv.config();

/**
 * @description Middleware para autorizar superusuários a realizar ações exclusivas.
 * @warning Espera um usuário previamente autenticado.
 */
export default function authorizeRoot(req: Request, res: Response, next: NextFunction): any {
    try {
        if (!req.user || !req.user.id){
          throw new AuthenticationError();
        }

        if (req.user.email != process.env.ROOT_EMAIL) {
            throw new AccessDeniedError("Acesso negado. Permissão de super-usuário necessária.")
        }
        
        return next();

    } catch (e) {
        console.error(e);

        if (e instanceof HttpError) {
            return e.sendMessage(res);
        }

        const classifiedError = new ImprevistError();
        return classifiedError.sendMessage(res);
    }
}

// remover pós merge !!!!!!
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        name: string;
        admin: boolean;
      };
    }
  }
}
