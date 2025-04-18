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

    /**
     * @route PATCH /deposit/status
     * @description  atualiza os estados do deposito, somente administradores
     * @param {string} collectionPointId
     * @param {string} status
     * @returns { message: string } 
     */
    .patch('/deposit/status', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

export default depositRouter;