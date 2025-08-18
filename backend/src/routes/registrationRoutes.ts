import { Router } from "express";
import RegistrationController from "../controllers/registrationController";
import AuthMiddleware from "../middlewares/authMiddleware";

const registrationRouter = Router();

registrationRouter

    /**
    * @route GET /admin/registration?page=xx&limit=xx
    * @description Retorna as páginas de todos os registros
    * @default (1,10) (página,itens)
    * @returns { amount: number, registration: Registration[] } 
    */

.get("/admin/registration", AuthMiddleware.ensureAdmin, RegistrationController.getRegistrationAll)

    /**
    * @route GET /user/registration?page=xx&limit=xx
    * @description Retorna as páginas de registros do usuário
    * @default (1,10) (página,itens)
    * @returns { amount: number, registration: Registration[] } 
    */
.get("/user/registration", AuthMiddleware.ensureAuthenticated, RegistrationController.getRegistrationByUser)

/**
 * @route POST /user/registration
 * @description Cria um registro de inscrição para o usuário autenticado em um evento
 * @param {string} eventId - ID do evento para o qual o usuário deseja se inscrever
 * @returns { message: string }
 * 
 */
.post("/user/registration/:id_event", AuthMiddleware.ensureAuthenticated, RegistrationController.createRegistration)

/**
 * @route PUT /admin/registration/:id_event
 * @description Atualiza o status da inscrição do usuário em um evento
 * @returns { message: string }
 */
.patch("/admin/registration", AuthMiddleware.ensureAuthenticated, AuthMiddleware.ensureAdmin, RegistrationController.validateRegistration)


export default registrationRouter;