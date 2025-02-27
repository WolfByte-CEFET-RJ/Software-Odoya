import e from "express";

import AuthController from "../controllers/authController";

const authRouter = e.Router();

authRouter
    .post("/login", AuthController.login);


export default authRouter;


