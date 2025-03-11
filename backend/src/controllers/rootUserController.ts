import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import { ImprevistError } from "../erros/ImprevistError";
import RootUserService from "../services/rootUserService";
import { RootUserModificationError } from "../erros/AuthErros";
import UserService from "../services/userService";
import User from "../types/user"
export default class RootUserController {   
    public static async changeRole(req: Request, res: Response): Promise<any>{
        try{
            const { user_id } = req.params;
            if(req.user?.id === user_id){
                throw new RootUserModificationError("Usuário root não pode ter suas permissões alteradas.")
            }

            const response = await RootUserService.changeRole(user_id);

            res.status(HttpCode.OK).json({message: response});

        }catch(e){
             console.error(e);
            
            if(e instanceof HttpError){
                return e.sendMessage(res);
            }
    
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res); 
        }
    }

    public static async getAllUsers(req: Request, res: Response): Promise<any>{
        try{
            const users: User[] = await UserService.getAll()
            res.status(HttpCode.OK).json({amount: users.length, users});

        }catch(e){
             console.error(e);
            
            if(e instanceof HttpError){
                return e.sendMessage(res);
            }
    
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res); 
        }
    }
}