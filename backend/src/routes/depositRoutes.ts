import { Router } from "express";
import DepositController from "../controllers/depositController";
import AuthMiddleware from "../middlewares/authMiddleware";
import UploadImageConfig from "../middlewares/uploadImage";

const upload  = UploadImageConfig.getUploader();
const depositRouter = Router();

depositRouter
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
     * @returns { Deposit } 
     */
    .get("/deposit/:id", AuthMiddleware.ensureAuthenticated, DepositController.getOneDeposit)

    /**
     * @route GET /deposit/collection/:collection_id
     * @description Retorna os depósitos em um ponto de coleta
     * @param {string} collection_id - ID do ponto de coleta
     * @returns { Deposit[] } 
     */
    .get("/deposit/collection/:collection_id", AuthMiddleware.ensureAuthenticated, DepositController.getByCollection)

    /**
     * @route POST /deposit
     * @description cria um deposito,verifica se o usuário está logado e pega o id do usuário logado para fazer o deposit
     * @param {string} collectionPointId
     * @param {Number} amountSponges
     * @param {string} imageURL
     * @returns { message: string } 
     */
    .post('/deposit/:collection_id',AuthMiddleware.ensureAuthenticated, upload.single("comprovante"), DepositController.createDeposit)

    /**
     * @route PATCH /deposit/status
     * @description  atualiza os estados do deposito e distribui os devidos pontos, somente administradores
     * @param {string} collectionPointId
     * @param {Number} collection_id
     * @param {string} status
     * @returns { message: string } 
     */
    .patch('/deposit/status/:collection_id', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

export default depositRouter;
