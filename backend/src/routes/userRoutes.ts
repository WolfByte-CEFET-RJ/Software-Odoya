import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController';

router
    .post('/user', UserController.createUser)

export default router;