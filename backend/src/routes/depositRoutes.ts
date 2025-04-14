import { Router } from "express";
import DepositController from "../controllers/depositController";
import AuthMiddleware from "../middlewares/authMiddleware";

const depositRouter = Router();

depositRouter
    //retorna um deposito dado id do deposito, verifica se o usuário está logado
    .get('/deposit', AuthMiddleware.ensureAuthenticated, DepositController.getDeposit)

    /**
     * @route GET /deposits
     * @description Retorna todos os depósitos (todos para admin, somente do usuário para usuário comum)
     * @returns { Deposit[] } 
     */
    .get("/deposits", AuthMiddleware.ensureAuthenticated, DepositController.getAllDeposits)
    /**
     * @route GET /deposit/:id
     * @description Retorna um depósito dado o ID do depósito
     * @param {string} id - ID do depósito
     * @returns { message: string } 
     */
    .get("/deposit/:id", AuthMiddleware.ensureAuthenticated, DepositController.getOneDeposit)

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
    /**
     * @route PATCH /deposit/status
     * @description Atualiza o status de um depósito
     * @param {string} id - ID do depósito
     * @param {string} status - Novo status do depósito
     * @returns { message: string } 
     */
    .patch('/deposit/status', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

export default depositRouter;
