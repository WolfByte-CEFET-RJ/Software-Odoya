import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';
import { HttpCode } from '../erros/erro.config';

export default class UserController {
    public static async getUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const id = req.user?.id;

            const user = await UserService.getUser(String(id));
            return res.status(HttpCode.OK).json(user);

        } catch(e: any){
            next(e);
        }
    }
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const {name, email, password} = req.body;
            
            const response = await UserService.createUser(name, email, password);
            return res.status(HttpCode.CREATED).json({message: response});

        } catch(e: any){
            next(e);
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const id = req.user?.id;
            const data = req.body;
            
            const response = await UserService.updateUser(String(id),data);
            return res.status(HttpCode.OK).json({message: response});
        
        } catch(e: any){
            next(e);
        }
    }
    
    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const id = req.user?.id;
            
            const response = await UserService.deleteUser(id);
            return res.status(HttpCode.NO_CONTENT).json({message: response});

        } catch(e: any){
            next(e);
        }
    }

    public static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email } = req.body;

            const response = await UserService.forgotPassword(email);
            return res.status(HttpCode.OK).json({message: response});

        } catch (e: any) {
            next(e);
        }
    }
}