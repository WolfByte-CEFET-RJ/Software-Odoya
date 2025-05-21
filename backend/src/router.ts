/**
 * @file Mapeamento dos endpoints
*/

import { Express, Request, Response } from 'express';
import rootUser from './routes/rootUserRoutes';
import authRouter from './routes/authRoutes';
import mutiraoRouter from './routes/mutiraoRoutes';
import user from './routes/userRoutes';
import collectionPointRouter from './routes/collectionPointRoutes';
import spongeDepositRouter from './routes/depositRoutes';
import depositRouter from './routes/depositRoutes';

const bodyParser = require('body-parser');
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
        .use(bodyParser.json())
        .use(user)
        .use(authRouter)
        .use(user)
        .use(collectionPointRouter)
        .use(depositRouter)
        .use(spongeDepositRouter)
        .use(mutiraoRouter)

    // Rota padrão
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({status: true, message: "✔ Connection sucessfully stablished!"})
    });
    

}       

