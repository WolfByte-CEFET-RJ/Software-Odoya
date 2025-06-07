import { NextFunction, Request, response, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import RegistrationService from "../services/registrationService";
import Registration from "../types/registration";

export default class RegistrationController {
    public static async getRegistrationAll(req: Request, res: Response,  next: NextFunction): Promise<any>{
            try {
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 10;
    
                const Registrations: Registration[] = await RegistrationService.getRegistrationAll(page, limit);
                res.status(HttpCode.OK).json({amount: Registrations.length, Registrations});
    
            } catch(e: any){
                next(e);
            }
        }

}