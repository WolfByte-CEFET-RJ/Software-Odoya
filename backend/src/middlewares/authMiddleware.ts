// src/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
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
  public static ensureAuthenticated(req: Request, res: Response, next: NextFunction): Response | void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return res.status(401).json({ message: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Token mal formatado' });
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
      return res.status(401).json({ message: 'Token inválido ou expirado' });
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
}

// Extensão da interface Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        admin: boolean;
      };
    }
  }
}

export default AuthMiddleware;