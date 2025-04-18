import { Router } from "express";
import RootUserController from "../controllers/rootUserController";
import AuthMiddleware from "../middlewares/authMiddleware";

const rootUserRouter = Router();

rootUserRouter
    /**
     * @route PATCH root/user/role/:user_id
     * @description Atualiza o cargo de um usuário (admin ou normal).
     * @param {string} user_id - ID do usuário cujo cargo será alterado.
     * @returns { message: string; } 
     */
    .patch("/root/user/role/:user_id", AuthMiddleware.authorizeRoot, RootUserController.changeRole)
    
    /**
    * @route GET root/user/all
    * @description Fornece todos os usuários (com exceção do super-usuário) 
    * @returns { amount: number, user: User[] } 
    */
    .get("/root/user/all", AuthMiddleware.authorizeRoot, RootUserController.getAllUsers)

    /**
     * @route /root/user/user_id
     * @description Atualiza os dados de um usuário cadastrado.
     * @param {string} user_id - ID do usuário a ser modificado.
     * @param {UpdateUserData} new_user_data
     * @returns { message: string } 
     */
    .patch("/root/user/:user_id", AuthMiddleware.authorizeRoot, RootUserController.updateUser)

    /**
     * @route /root/user/user_id
     * @description Exclui os dados de um usuário cadastrado.
     * @param {string} user_id - ID do usuário a ser deletado.
     * @returns { message: string } 
     */
    .delete("/root/user/:user_id", AuthMiddleware.authorizeRoot, RootUserController.deleteUser);

export default rootUserRouter;