import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { HttpError } from "../erros/erro.config";
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
}