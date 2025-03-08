import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export default class AuthController {
    public static async login(req: Request, res: Response): Promise<any>{
        try{
            const email = req.body.email;
            const password = req.body.password;

            const token = await AuthService.login(email, password);

            return res.status(200).send({
                message: 'Login Realizado com sucesso',
                token: `Bearer ${token}`
            })
        }catch(error: any){
            //login error
            
            return res.status(400).send({
                message: error.message,
            })
        }
    }
}