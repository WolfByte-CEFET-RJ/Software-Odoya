import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import RootUserService from "../services/rootUserService";
import { RootUserModificationError } from "../erros/AuthErros";
import UserService from "../services/userService";
import User from "../types/user"
import { InvalidSearch } from "../erros/CommonErros";
export default class RootUserController {   
    public static async changeRole(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { user_id } = req.params;
            if(req.user?.id === user_id){
                throw new RootUserModificationError("Usuário root não pode ter suas permissões alteradas.")
            }

            const response = await RootUserService.changeRole(user_id);

            res.status(HttpCode.OK).json({message: response});

        } catch(e: any){
            next(e);
        }
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const users: User[] = await UserService.getAll()
            res.status(HttpCode.OK).json({amount: users.length, users});

        } catch(e: any){
            next(e);
        }
    }

    public static async getUsersPagination(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const order = req.query.order as string || "id";

            const possible_fields = ["id", "name", "email", "admin", "points"];

            if(!possible_fields.includes(order)){
                throw new InvalidSearch(`${order} não é válidos como parâmetro de ordenação. Experimente: ${possible_fields.join(" / ")}`)
            }

            const users: User[] = await UserService.getAllPagination(page, limit, order);
            res.status(HttpCode.OK).json({amount: users.length, users});

        } catch(e: any){
            next(e);
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const { user_id } = req.params;
            const { ...data } = req.body

            const response: string = await UserService.updateUser(user_id, data);

            res.status(HttpCode.OK).json({message: response});

        } catch(e: any){
            next(e);
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { user_id } = req.params;

            const response: string = await UserService.deleteUser(user_id);

            res.status(HttpCode.OK).json({message: response});

        } catch(e: any){
            next(e);
        }
    }
}