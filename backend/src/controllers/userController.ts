import { Request, Response } from 'express';
import UserService from '../services/userService';
import { HttpCode, HttpError } from '../erros/erro.config';
import { ImprevistError } from '../erros/ImprevistError';
import { ValidationError } from 'yup';


export default class UserController {
    public static async getUser(req: Request, res: Response): Promise<any>{
        const id = req.user?.id;

        try{
            const user = await UserService.getUser(String(id));
            return res.status(HttpCode.OK).json(user);
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
    public static async createUser(req: Request, res: Response): Promise<any>{
        const {name, email, password} = req.body;

        try{
            const response = await UserService.createUser(name, email, password);
            return res.status(HttpCode.CREATED).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors });
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }
    public static async updateUser(req: Request, res: Response): Promise<any>{
        const id = req.user?.id;
        const data = req.body;
        
        try{
            const response = await UserService.updateUser(String(id),data);
            return res.status(HttpCode.OK).json({message: response});
        }catch(e: any){
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            }

            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors });
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