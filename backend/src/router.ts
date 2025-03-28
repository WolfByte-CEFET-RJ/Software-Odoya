/**
 * @file Mapeamento dos endpoints
*/

import { Express, Request, Response } from 'express';
import rootUser from './routes/rootUserRoutes';
import authRouter from './routes/authRoutes';
import user from './routes/userRoutes';
import collectionPointRouter from './routes/collectionPointRoutes';
import DepositRoutes from './routes/depositRoutes';

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
    const depositRoutes = new DepositRoutes();

    app
        .use(rootUser)
        .use(authRouter)
        .use(user)
        .use(collectionPointRouter)
        .use(depositRoutes.getRouter())
        
    // Rota padrão
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({status: true, message: "✔ Connection sucessfully stablished!"})
    });
    
}
