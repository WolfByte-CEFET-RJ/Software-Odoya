import { Router } from "express";
import DepositController from "../controllers/depositController";
import AuthMiddleware from "../middlewares/authMiddleware";
import UploadImageConfig from "../middlewares/uploadImage";

const upload  = UploadImageConfig.getUploader();
const depositRouter = Router();

depositRouter
    /**
     * @route GET /deposits
     * @description Retorna todos os depositos de um usuario
     * @returns { Deposit[] } 
     */
    .get('/deposits', AuthMiddleware.ensureAuthenticated, DepositController.getDeposit)

    /**
     * @route GET /deposits
     * @description Retorna todos os depósitos
     * @returns { Deposit[] } 
     */
    .get("/deposits/adm", AuthMiddleware.ensureAdmin, DepositController.getAllDeposits)
    
    /**
     * @route GET /deposit/:id
     * @description Retorna um depósito dado o ID do depósito
     * @param {string} id - ID do depósito
     * @returns { message: string } 
     */
    .get("/deposit/:id", AuthMiddleware.ensureAdmin, DepositController.getOneDeposit)

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
