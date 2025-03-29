/**
 * @file Mapeamento dos endpoints
*/

import { Express, Request, Response } from 'express';
import rootUser from './routes/rootUserRoutes';
import authRouter from './routes/authRoutes';
import user from './routes/userRoutes';
import spongeDepositRouter from './routes/spongeDepositRoutes';

/**
 * Define endpoints mapeados
 * 
 * @param {Express} app - Instância do express
 * 
 * @example
 * import express from 'express';
 * import router from './router';
 * 
 * const app = express();
 * router(app)
 */
export default (app: Express): void => {
    app
        .use(rootUser)
        .use(authRouter)
        .use(user)
        .use(spongeDepositRouter)

    // Rota padrão
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({status: true, message: "✔ Connection sucessfully stablished!"})
    });
    
}
