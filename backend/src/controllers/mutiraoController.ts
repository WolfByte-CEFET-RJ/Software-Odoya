import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import MutiraoService from "../services/mutiraoService"
import Mutirao from "../types/mutirao";
import { ImprevistError } from "../erros/ImprevistError";
import { ValidationError } from 'yup';



export default class MutiraoController {

    public static async getAllMutiroesScheduled(req: Request, res: Response) { 
        
        try {
                const mutiroes: Partial<Mutirao>[] = await MutiraoService.getAllMutiroesScheduled();
                res.status(HttpCode.OK).json(mutiroes);
            } catch (e) {
                if (e instanceof HttpError) {
                    return e.sendMessage(res);
                }
    
                const classified_err = new ImprevistError();
                return classified_err.sendMessage(res);
            }
        }

    public static async getAllMutiroes(req: Request, res: Response) {
        
        try {
                const mutiroes: Mutirao[] = await MutiraoService.getAllMutiroes();
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
        const id  = req.params.id
        try {
                const multirao: Mutirao = await MutiraoService.getOneMutirao(id);
                res.status(HttpCode.OK).json(multirao);
            } catch (e) {
                if (e instanceof HttpError) {
                    return e.sendMessage(res);
                }
    
                const classified_err = new ImprevistError();
                return classified_err.sendMessage(res);
            }
        }


}