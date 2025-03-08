import { Router } from "express";
import RootUserController from "../controllers/rootUserController";
import AuthMiddleware from "../middlewares/authMiddleware";

const rootUserRouter = Router();

rootUserRouter
    /**
     * @route PATCH /role/:user_id
     * @description Atualiza o cargo de um usuário (admin ou normal).
     * @param {string} user_id - ID do usuário cujo cargo será alterado.
     * @returns { message: string; } 
     */
    .patch("/role/:user_id", AuthMiddleware.authorizeRoot, RootUserController.changeRole);

export default rootUserRouter;