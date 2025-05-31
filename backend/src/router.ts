/**
 * @file Mapeamento dos endpoints
*/

import express, { Express, Request, Response } from 'express';
import rootUser from './routes/rootUserRoutes';
import authRouter from './routes/authRoutes';
import eventRouter from './routes/eventRoutes';
import user from './routes/userRoutes';
import collectionPointRouter from './routes/collectionPointRoutes';
import spongeDepositRouter from './routes/depositRoutes';
import depositRouter from './routes/depositRoutes';
import path from 'path';

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

    // Serviços
    app
        .use(rootUser)
        .use(user)
        .use(authRouter)
        .use(user)
        .use(collectionPointRouter)
        .use(depositRouter)
        .use(spongeDepositRouter)
        .use(eventRouter)


    // Rota padrão
    app
        .get('/', (req: Request, res: Response) => {
            console.log(process.env.NODE_ENV)
            res.status(200).json({status: true, message: "✔ Connection sucessfully stablished!"})
        });
    
    // Arquivos locais
    if(process.env.NODE_ENV == "development"){
        app.use('/uploads', 
                express.static(path.resolve(process.cwd(), 'uploads')));
    }
}       

