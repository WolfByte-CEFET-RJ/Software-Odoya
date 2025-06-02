import { Router } from "express";
import DepositController from "../controllers/depositController";
import AuthMiddleware from "../middlewares/authMiddleware";
import UploadImageConfig from "../middlewares/uploadImage";

const upload  = UploadImageConfig.getUploader();
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
    .post('/deposit',AuthMiddleware.ensureAuthenticated, upload.single("comprovante"), DepositController.createDeposit)

    /**
     * @route PATCH /deposit/status
     * @description  atualiza os estados do deposito e distribui os devidos pontos, somente administradores
     * @param {string} collectionPointId
     * @param {Number} id
     * @param {string} status
     * @returns { message: string } 
     */
    .patch('/deposit/status', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

export default depositRouter;
