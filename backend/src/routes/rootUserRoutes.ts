import { Router } from "express";
import authorizeRoot from "../middlewares/authorizeRoot";
import RootUserController from "../controllers/rootUserController";

const rootUserRouter = Router();

rootUserRouter
    /**
     * @route PATCH /role/:user_id
     * @description Atualiza o cargo de um usuário (admin ou normal).
     * @param {string} user_id - ID do usuário cujo cargo será alterado.
     * @returns { message: string; } 
     */
    .patch("/role/:user_id", authorizeRoot, RootUserController.changeRole);

export default rootUserRouter;