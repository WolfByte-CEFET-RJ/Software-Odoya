import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { HttpCode, HttpError } from "../erros/erro.config";
import { ImprevistError } from "../erros/ImprevistError";

export default class AuthController {
    public static async login(req: Request, res: Response): Promise<any>{
        try{
            const email = req.body.email;
            const password = req.body.password;

            const token = await AuthService.login(email, password);

            return res.status(200).send({
                message: 'Login Realizado com sucesso',
                token: `${token}`
            })
        }catch(e: any){
            if(e instanceof HttpError){
                return e.sendMessage(res);
            }
            
            const imp_err = new ImprevistError();
            return imp_err.sendMessage(res);
        }
    }

    public static async googleAuth(req: Request, res: Response): Promise<any>{
        try {
            const { token } = req.body;
            const systemToken: string = await AuthService.handleGoogleAuth(token);

            return res.status(HttpCode.OK).json({
                message: "Autenticação com google realizada! Anexe o token fornecido ao cabeçalho das requisições",
                token: systemToken
            })
            
        } catch (e: any) {
            console.log(e);

            if(e instanceof HttpError){
                return e.sendMessage(res);
            }
            
            const imp_err = new ImprevistError(e.message);
            return imp_err.sendMessage(res);        
        }
    }
}