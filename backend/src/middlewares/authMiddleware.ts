// src/middlewares/AuthMiddleware.ts
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
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      res.status(401).json({ message: 'Erro no formato do token' });
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ message: 'Token mal formatado' });
      return;
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;
      
      if (!jwtSecret) {
        throw new Error('JWT_SECRET não está definido no ambiente');
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
      res.status(401).json({ message: 'Token inválido ou expirado' });
      return;
    }
  }

  /**
   * @method ensureAdmin
   * @description Verifica se o usuário é administrador.
   */
  public static ensureAdmin(req: Request, res: Response, next: NextFunction): void {
    AuthMiddleware.ensureAuthenticated(req, res, () => {
      if (req.user?.admin) {
        return next();
      }
      
      return res.status(403).json({ message: 'Acesso negado. Permissão de administrador necessária.' });
    });
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