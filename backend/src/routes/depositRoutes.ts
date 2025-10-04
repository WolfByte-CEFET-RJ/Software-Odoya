import { Router } from "express";
import DepositController from "../controllers/depositController";
import AuthMiddleware from "../middlewares/authMiddleware";
import UploadImageConfig from "../middlewares/uploadImage";

const upload  = UploadImageConfig.getUploader();
const depositRouter = Router();

depositRouter
    /**
     * @route GET /deposits?page=xx&limit= xx
     * @description Retorna todos os depositos de um usuario
     * @default (1,9) (página,itens)
     * @returns { amount: number, totalPages: number, deposit: Deposit[] , collectionPoint_name } 
     */
    .get('/deposits', AuthMiddleware.ensureAuthenticated, DepositController.getDeposit)

    /**
     * @route GET /deposits/adm:id?page=xx&limit= xx
     * @description Retorna todos os depósitos, número de págianas totais e a quantidade de entradas dado o id de um colection point 
     * @default (1,9) (página,itens)
     * @param {string} id - ID do colection point 
     * @returns { amount: number, totalPages: number, deposit: Deposit[] } 
     */
    .get("/deposit/adm/:id", AuthMiddleware.ensureAdmin, DepositController.getAllDeposits)
    
    /**
     * @route GET /deposits/adm/search:id?page=xx&limit=xx&name=xx
     * @description Retorna todos os depósitos dado um nome de usuário
     * @default (1,9) (página,itens)
     * @param {string} id - ID do colection point 
     * @param {string} name - nome ou parte de um nome
     * @returns { amount: number, totalPages: number, deposit: Deposit[] } 
     */
    .get("/deposit/adm/search/:id", AuthMiddleware.ensureAdmin, DepositController.getSearchDeposit)

    /**
     * @route GET /deposit/:id
     * @description Retorna um depósito dado o ID do depósito
     * @param {string} id - ID do depósito
     * @returns { Deposit } 
     */
    .get("/deposit/:id", AuthMiddleware.ensureAdmin, DepositController.getOneDeposit)

    /**
     * @route GET /deposit/frequency
     * @description Retorna a frequência de intervalos entre os depósitos em cada ponto de coleta
     * @returns { collectionPointId, point_name, totalDeposits }
     */
    .get("/deposits/frequency", AuthMiddleware.ensureAdmin, DepositController.getDepositFrequency)

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
     * @param {string} status
     * @returns { message: string } 
     */
    .patch('/deposit/status/:collection_id', AuthMiddleware.ensureAdmin, DepositController.updateDepositStatus)   

export default depositRouter;
