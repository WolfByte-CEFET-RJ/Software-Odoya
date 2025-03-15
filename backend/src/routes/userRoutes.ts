import { RequestHandler, Router } from 'express';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router
    /**
     * @route POST /user
     * @description Cria um usuário.
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @returns { message: string } 
     */
    .post('/user', UserController.createUser)
    /**
     * @route PATCH /user
     * @description Altera um usuário.
     * @param {string} id
     * @param {UpdateUserData} data
     * @returns { message: string } 
     */
    .patch('/user', UserController.updateUser)
    /**
     * @route DELETE /user
     * @description Deleta um usuario
     * @param {string} id
     * @returns { message: string }
     */
    .delete('/user', AuthMiddleware.ensureAuthenticated, UserController.deleteUser)

export default router;