import { Router } from "express";
import MutiraoController from "../controllers/mutiraoController";
import AuthMiddleware from "../middlewares/authMiddleware";

const mutiraoRouter = Router();

mutiraoRouter
    .get('/mutirao', AuthMiddleware.ensureAuthenticated, MutiraoController.getDeposit)

    /**
     * @route GET /mutiroes
     * @description Retorna todos os mutiroes (todos para admin, somente do usuário para usuário comum)
     * @returns { Mutiroes[] } 
     */
    .get("/mutiroes", AuthMiddleware.ensureAuthenticated, MutiraoController.getAllDeposits)
    /**
     * @route GET /mutirao/:id
     * @description Retorna um mutirao dado o ID
     * @param {string} id - ID do depósito
     * @returns { message: string } 
     */
    .get("/mutirao/:id", AuthMiddleware.ensureAuthenticated, MutiraoController.getOneDeposit)

    /**
     * @route POST /mutirao
     * @description cria um mutirao,verifica se o usuário está logado e pega o id do usuário logado para fazer o deposit
     * @param {string} nome
     * @param {string} local
     * @param {string} data
     * @param {string} horário
     * @param {string} pontoDeEncontro
     * @param {string} duracao
     * @returns { message: string } 
     */
    .post('/mutirao',AuthMiddleware.ensureAuthenticated, MutiraoController.createDeposit)

    /**
     * @route PATCH /mutirao
     * @description  atualiza os estados do deposito, somente administradores
     * @param {string} nome
     * @param {string} local
     * @param {string} data
     * @param {string} horário
     * @param {string} pontoDeEncontro
     * @param {string} duracao
     * @returns { message: string } 
     */
    .patch('/mutirao', AuthMiddleware.ensureAdmin, MutiraoController.updateDepositStatus)   

export default mutiraoRouter;