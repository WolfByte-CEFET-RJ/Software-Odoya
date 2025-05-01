/**
 * @file Configuração e instanciação do servidor express
*/

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './router'
import DatabaseConnection from './database/connection/DatabaseConnection';
import CollectionPointService from './services/collectionPointService';

const app: express.Express = express();

// Middlewares de configuração
app.use(cors());
app.use(express.json());

// Rotas principais
routes(app);

// Inicializa o servidor se for possivel estabelecer conexão com o bamco de dados
async function startServer(): Promise<void> {
  
  const connected = await DatabaseConnection.testConnection();
  if (!connected) {
    process.exit(1);
  }

  const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
  const HOST: string = process.env.HOST || "0.0.0.0";
  
  app.listen(PORT, HOST, async () => {
    const data = await CollectionPointService.checkColectionPointNotification();
    console.log(data);
    console.log(`🔥 \tServidor ativo em: http://localhost:${PORT}`);
  });
}

startServer();