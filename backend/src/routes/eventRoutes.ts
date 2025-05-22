import { Router } from "express";
import EventController from "../controllers/eventController";
import AuthMiddleware from "../middlewares/authMiddleware";

const eventRouter = Router();

eventRouter
    /**
     * @route GET /event
     * @description Retorna todos os mutirões que estejam com datas marcadas para acontecer. se não tiver nenhum retorna um array vazio
     * @decription date está retornando no formato yyyy-mm-ddThh:00:000Z por enquanto
     * @returns { Event[] }
     * @Multiroes [] { name , location, date, meetingpoint, estimatedDuration}
     */
    .get("/events/scheduled", AuthMiddleware.ensureAuthenticated, EventController.getAllEventScheduled)

    /**
     * @route GET /event/admin
     * @description Retorna todos os mutirões do banco. somente admin
     * @returns { Event[] } 
     */
    .get("/events", AuthMiddleware.ensureAdmin, EventController.getAllEvent)

    /**
     * @route GET /event/:id
     * @description Retorna um mutirão dado o ID
     * @param {string} id - ID do mutirão
     * @returns { Event } 
     */
    .get("/event/:id", AuthMiddleware.ensureAdmin, EventController.getOneEvent)

    /**
     * @route POST /event
     * @description cria um mutirão, apenas Admin
     * @param {string} nome
     * @param {string} local
     * @param {string} data
     * @param {string} horário
     * @param {string} pontoDeEncontro
     * @param {string} duracao
     * @returns { message: string } 
     */
    //.post('/event',AuthMiddleware.ensureAdmin, MutiraoController.createMutirao)


export default eventRouter;