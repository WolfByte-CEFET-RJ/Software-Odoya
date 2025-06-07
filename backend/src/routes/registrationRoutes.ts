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


export default registrationRouter;