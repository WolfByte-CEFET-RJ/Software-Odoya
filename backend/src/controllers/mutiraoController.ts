import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import MutiraoService from "../services/mutirao";
import Mutirao from "../types/mutirao";
import { ImprevistError } from "../erros/ImprevistError";
import { ValidationError } from 'yup';



export default class MutiraoService {

    public static async getAllMutiroes(req: Request, res: Response) {
            try {
                // Verifica se o usuário é admin através do middleware
                const isAdmin = req.user?.admin || false;
                const userId = req.user?.id as string;
    
                const mutiroes: Mutirao[] = await MutiraoService.getAllMutiroes(userId, isAdmin);
                res.status(HttpCode.OK).json(mutiroes);
            } catch (e) {
                if (e instanceof HttpError) {
                    return e.sendMessage(res);
                }
    
                const classified_err = new ImprevistError();
                return classified_err.sendMessage(res);
            }
        }

    public static async getOneMutirao(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const collectionPoint: Mutirao = await MutiraoService.getOneMutirao(id);
            res.status(HttpCode.OK).json(Mutirao);

        } catch (e: any) {
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 
            
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }

    }

    public static async createMutirao(req: Request, res: Response) {
        const requestBody: Mutirao = req.body;

        try {
            const response = await MutiraoService.createMutirao(requestBody);
            res.status(HttpCode.CREATED).json(response);
        } catch (e) {
            if(e instanceof HttpError) {
                return e.sendMessage(res);
            } 
            
            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

}