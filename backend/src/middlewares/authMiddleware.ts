import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AccessDeniedError, AuthenticationError } from '../erros/AuthErros';
import { HttpError } from '../erros/erro.config';
import { ImprevistError } from '../erros/ImprevistError';

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  admin: boolean;
  iat: number;
  exp: number;
}

/**
 * @class AuthMiddleware
 * @description Middleware para autenticação e autorização.
 */
class AuthMiddleware {
  /**
   * @method ensureAuthenticated
   * @description Verifica se o usuário está autenticado através do token JWT.
   */
  public static ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError("Token não fornecido");
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new AuthenticationError("Erro no formato do token");
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      throw new AuthenticationError("Token mal formatado");
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;
      
      if (!jwtSecret) {
        throw new ImprevistError('JWT_SECRET não está definido no ambiente');
      }

      const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
      
      req.user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        admin: decoded.admin
      };

      return next();
    } catch (error) {
      if (error instanceof HttpError) {
        return error.sendMessage(res);
      }
      
      if (error instanceof jwt.JsonWebTokenError) {
        const authError = new AuthenticationError("Token inválido ou expirado");
        return authError.sendMessage(res);
      }
      
      const classifiedError = new ImprevistError();
      return classifiedError.sendMessage(res);
    }
  }

  /**
   * @method ensureAdmin
   * @description Verifica se o usuário é administrador.
   */
  public static ensureAdmin(req: Request, res: Response, next: NextFunction): void {
    try {
      AuthMiddleware.ensureAuthenticated(req, res, () => {
        if (!req.user?.admin) {
          const error = new AccessDeniedError("Acesso negado. Permissão de administrador necessária.");
          return error.sendMessage(res);
        }
        
        return next();
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return error.sendMessage(res);
      }
      
      const classifiedError = new ImprevistError();
      return classifiedError.sendMessage(res);
    }
  }

   /**
   * @method authorizeRoot
   * @description Autoriza super-usuários a realizar ações exclusivas.
   */
   public static authorizeRoot(req: Request, res: Response, next: NextFunction): any {
    AuthMiddleware.ensureAdmin(req, res, ()=>{
      try {

        if (req.user?.email != process.env.ROOT_EMAIL) {
          throw new AccessDeniedError("Acesso negado. Permissão de super-usuário necessária.");
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
    });
  }
  
}

// Extensão da interface Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        admin: boolean;
      };
    }
  }
}

export default AuthMiddleware;