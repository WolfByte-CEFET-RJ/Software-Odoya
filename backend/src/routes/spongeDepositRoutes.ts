import {  Router } from 'express';
import DepositController from '../controllers/depositController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router
    //retorna um deposito dado id do deposito, verifica se o usuário está logado
    .get('/spongeDeposit', AuthMiddleware.ensureAuthenticated, DepositController.getDeposit)
    //cria um deposito,  verifica se o usuário está logado
    .post('/spongeDeposit',AuthMiddleware.ensureAuthenticated, DepositController.createDeposit)
    //atualiza um deposito, apenas verifica se um usuário está logado, novo estado será sempre pendente
    .patch('/spongeDepositStatus', AuthMiddleware.ensureAdmin, DepositController.updateDeposit) 

    //apenas atualiza os estados, somente adiministradores
    .patch('/spongeDepositStatus', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   
    //deleta o deposito, somente super root
    .delete('/spongeDeposit', AuthMiddleware.authorizeRoot, DepositController.deleteDeposit)

export default router;