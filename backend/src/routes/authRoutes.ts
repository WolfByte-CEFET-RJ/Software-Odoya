import { Router } from "express";

import AuthController from "../controllers/authController";

const authRouter = Router();


authRouter
    /**
     * @route POST /login
     * @description Retorna um token no caso de login bem sucedido.
     * @returns { message: string; token?: string; } 
     */
    .post("/login", AuthController.login);


export default authRouter;


