import {  Router } from 'express';
import DepositController from '../controllers/depositController';
import AuthMiddleware from '../middlewares/authMiddleware';

const spongeDepositRouter = Router();

spongeDepositRouter
    //retorna um deposito dado id do deposito, verifica se o usuário está logado
    .get('/spongeDeposit', AuthMiddleware.ensureAuthenticated, DepositController.getDeposit)

    /**
     * @route POST /spongeDeposit
     * @description cria um deposito,verifica se o usuário está logado
     * @param {string} collectionPointId
     * @param {string} userId
     * @param {Number} amountSponges
     * @param {string} imageURL
     * @returns { message: string } 
     */
    .post('/spongeDeposit',AuthMiddleware.ensureAuthenticated, DepositController.createDeposit)

    
    //atualiza um deposito, apenas verifica se um usuário está logado, novo estado será sempre pendente !!!!!!!
    .patch('/spongeDepositStatus', AuthMiddleware.ensureAdmin, DepositController.updateDeposit) 


    //apenas atualiza os estados, somente administradores
    .patch('/spongeDepositStatus', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

    //deleta o deposito, somente super root
    .delete('/spongeDeposit', AuthMiddleware.authorizeRoot, DepositController.deleteDeposit)

export default spongeDepositRouter;