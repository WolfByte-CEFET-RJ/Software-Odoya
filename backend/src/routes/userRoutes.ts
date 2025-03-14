import { Router } from 'express';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router
    /**
     * @route GET /user
     * @description Busca um usuário.
     * @param {string} id
     * @returns { User }
     */
    .get('/user', AuthMiddleware.ensureAuthenticated, UserController.getUser)
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
    .patch('/user', AuthMiddleware.ensureAuthenticated, UserController.updateUser)

export default router;