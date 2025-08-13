import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";
import { HttpCode } from "../erros/erro.config";

export default class    AuthController {
    public static async login(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const email = req.body.email;
            const password = req.body.password;

            const token = await AuthService.login(email, password);

            return res.status(HttpCode.OK).send({
                message: 'Login Realizado com sucesso',
                token: `${token}`
            })

        } catch(e: any){
            next(e);
        }
    }

    public static async googleAuth(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { token } = req.body;
            const systemToken: string = await AuthService.handleGoogleAuth(token);

            return res.status(HttpCode.OK).json({
                message: "Autenticação com google realizada com sucesso!",
                token: systemToken
            })
            
        } catch (e: any) {
            next(e);        
        }
    }
}