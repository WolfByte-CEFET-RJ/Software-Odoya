import { Router } from "express";
import MutiraoController from "../controllers/mutiraoController";
import AuthMiddleware from "../middlewares/authMiddleware";

const mutiraoRouter = Router();

mutiraoRouter
    /**
     * @route GET /mutiroesscheduled
     * @description Retorna todos os mutiroes que estejam com datas marcadas para acontecer. se não tiver nenhum retorna um array vazio
     * @decription date está retornando no formato yyyy-mm-ddThh:00:000Z por enquanto
     * @returns { Mutirao[] }
     * @Multiroes [] { name , location, date, meetingpoint, estimatedDuration}
     */
    .get("/mutiroes", AuthMiddleware.ensureAuthenticated, MutiraoController.getAllMutiroesScheduled)

    /**
     * @route GET /mutiroes
     * @description Retorna todos os mutiroes do banco. somente admin
     * @returns { Mutirao[] } 
     */
    .get("/mutiroesadmin", AuthMiddleware.ensureAdmin, MutiraoController.getAllMutiroes)

    /**
     * @route GET /mutirao/:id
     * @description Retorna um mutirao dado o ID
     * @param {string} id - ID do mutirao
     * @returns { Multirao } 
     */
    .get("/mutirao/:id", AuthMiddleware.ensureAdmin, MutiraoController.getOneMutirao)

    /**
     * @route POST /mutirao
     * @description cria um mutirao, apenas Admin
     * @param {string} nome
     * @param {string} local
     * @param {string} data
     * @param {string} horário
     * @param {string} pontoDeEncontro
     * @param {string} duracao
     * @returns { message: string } 
     */
    //.post('/mutirao',AuthMiddleware.ensureAdmin, MutiraoController.createMutirao)


export default mutiraoRouter;