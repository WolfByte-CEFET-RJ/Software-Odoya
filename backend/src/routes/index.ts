/**
 * @file Mapeamento dos endpoints
*/

import { Express, Request, Response } from 'express';
const bodyParser = require('body-parser');
import user from './userRoutes';

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
        .use(bodyParser.json())
        .use(user);

    // Rota padrão
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({status: true, message: "✔ Connection sucessfully stablished!"})
    });
    
}
