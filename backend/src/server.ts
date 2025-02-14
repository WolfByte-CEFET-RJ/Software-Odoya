/**
 * @file Configuração e instanciação do servidor express
*/

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './router'

const app: express.Express = express();

// Middlewares de configuração
app.use(cors());
app.use(express.json());

// Rotas principais
routes(app)

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
const HOST: string = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`🔥 \tServidor ativo em http://localhost:${PORT}`);
});