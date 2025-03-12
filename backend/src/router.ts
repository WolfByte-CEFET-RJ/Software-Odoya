/**
 * @file Mapeamento dos endpoints
*/

import { Express, Request, Response } from 'express';
import rootUser from './routes/rootUserRoutes';
import authRouter from './routes/authRoutes';
<<<<<<< HEAD
import user from './routes/userRoutes';
=======
import user from './routes/UserRoutes';
>>>>>>> feature/login-front

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
<<<<<<< HEAD
        .use(rootUser)
=======
        .use(bodyParser.json())
        .use(user)
>>>>>>> feature/login-front
        .use(authRouter)
        .use(user);

    // Rota padrão
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({status: true, message: "✔ Connection sucessfully stablished!"})
    });
    
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/login-front
