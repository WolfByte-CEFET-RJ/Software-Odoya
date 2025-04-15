import { Router } from 'express';
import UserController from '../controllers/userController';

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

export default router;