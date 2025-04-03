import {  Router } from 'express';
import DepositController from '../controllers/depositController';
import AuthMiddleware from '../middlewares/authMiddleware';

const depositRouter = Router();

depositRouter
    //retorna um deposito dado id do deposito, verifica se o usuário está logado
    .get('/deposit', AuthMiddleware.ensureAuthenticated, DepositController.getDeposit)

    /**
     * @route POST /deposit
     * @description cria um deposito,verifica se o usuário está logado e pega o id do usuário logado para fazer o deposit
     * @param {string} collectionPointId
     * @param {Number} amountSponges
     * @param {string} imageURL
     * @returns { message: string } 
     */
    .post('/deposit',AuthMiddleware.ensureAuthenticated, DepositController.createDeposit)


    //apenas atualiza os estados, somente administradores
    .patch('/deposit/status', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

export default depositRouter;