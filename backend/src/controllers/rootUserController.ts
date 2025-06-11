import { NextFunction, Request, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import RootUserService from "../services/rootUserService";
import { RootUserModificationError , WrongFlag } from "../erros/AuthErros";
import UserService from "../services/userService";
import User from "../types/user"
import { Flag } from "../types/user";
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

            if(req.query.isadm){ //validação da flag, caso o parametro tenha sido passado
                if(req.query.isadm !== '1' && req.query.isadm !== '0')
                throw new WrongFlag
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 9;
            const isAdm: Flag = (req.query.isadm as Flag) || Flag.UNDEFINIED;
            const data: (User & { total: number })[] = await  UserService.getAllPagination(page, limit, isAdm);

            const totalPages = Math.ceil(parseInt(data[0].total.toString(), 10) / limit); //Calcula o Total de páginas necessárias
            const users: User[] = data.map(({ total, ...user }) => user); //retira o total dos usuários
            res.status(HttpCode.OK).json({amount: users.length, totalPages: totalPages, users});

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