import { Request, Response } from 'express';
import UserService from '../services/userService';
import { HttpCode, HttpError } from '../erros/erro.config';
import { ImprevistError } from '../erros/ImprevistError';


export default class UserController {
    public static async createUser(req: Request, res: Response): Promise<any>{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(HttpCode.BAD_REQUEST).json({ message: "Nome, e-mail e senha são obrigatórios" });
        }
        try{
            const response = await UserService.createUser(name, email, password);
            return res.status(HttpCode.CREATED).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
    public static async updateUser(req: Request, res: Response): Promise<any>{
        const { id, ...data } = req.body;
        
        try{
            const response = await UserService.updateUser(id,data);
            return res.status(HttpCode.OK).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
    public static async deleteUser(req: Request, res: Response): Promise<any>{
        try{
            const id = req.user?.id;
            
            const response = await UserService.deleteUser(id);

            return res.status(HttpCode.OK).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError){
                return e.sendMessage(res);
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
}