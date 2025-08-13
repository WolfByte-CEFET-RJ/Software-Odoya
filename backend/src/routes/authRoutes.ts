import { Router } from "express";

import AuthController from "../controllers/authController";

const authRouter = Router();


authRouter
    /**
     * @route POST /login
     * @description Retorna um token no caso de login bem sucedido.
     * @returns { message: string; token?: string; } 
     */
    .post("/login", AuthController.login)
    
    /**
     * @route POST /auth/google
     * @description Autentica um usuario com sua conta conta google, caso ele não exista, registra o usuário e gera seu token de acesso
     * @param {string} token - Token gerado pela API Google Auth
     * @returns { message: string; token?: string; } 
     */
    .post("/auth/google", AuthController.googleAuth);


export default authRouter;

