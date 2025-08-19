import { NextFunction, Request, Response } from "express";
import RegistrationService from "../services/registrationService";
import { GroupedRegistration, Registration, RegistrationStatus } from "../types/registration";

import { HttpCode } from "../erros/erro.config";
import { AuthenticationError } from "../erros/AuthErros";
import { MissinngDataError } from "../erros/CommonErros";
import { RegistrationValidator } from "../utils/registrationValidator";
import { RegistrationStatusInvalid } from "../erros/RegistrationErros";

export default class RegistrationController {
    public static async getRegistrationAll(req: Request, res: Response,  next: NextFunction): Promise<any>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            const registrations: GroupedRegistration[] = await RegistrationService.getRegistrationAll(page, limit);
            res.status(HttpCode.OK).json({amount: registrations.length, registrations});
    
        } catch(e: any){
            next(e);
        }
    }

    public static async getRegistrationByUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            if (!req.user) {
            throw new Error("Usuário não autenticado");
        }
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const Registrations: Registration[] = await RegistrationService.getRegistrationByUser(page, limit, req.user.id);
            res.status(HttpCode.OK).json({amount: Registrations.length, Registrations});

        } catch(e: any){
            next(e);
        }
    }

    public static async createRegistration( req: Request, res: Response, next: NextFunction): Promise<any> {
        try{
            const userId = req.user?.id;

            if(!userId){
                throw new AuthenticationError();
            }

            const eventId = req.params.id_event;

            if(!eventId){
                throw new MissinngDataError("ID do mutirão não fornecido");
            }

            const response = await RegistrationService.createRegistration(userId, eventId);

            res.status(HttpCode.OK).json(response);
        }catch(e: any){
            next(e);
        }
    }

    public static async validateRegistration( req: Request, res: Response, next: NextFunction): Promise<any> {
        try{       
            const userId: string = req.body?.userId;
            const newStatus: RegistrationStatus = req.body?.status;
            const eventId: string = req.body?.eventId;

            if(!userId){
                throw new MissinngDataError("ID de usuário não fornecido");
            }

            if(!newStatus){
                throw new MissinngDataError("Status de inscrição não fornecido");
            }

            if(!eventId){
                throw new MissinngDataError("ID do mutirão não fornecido");
            }

            if(!RegistrationValidator.isStatusValid(newStatus)){
                throw new RegistrationStatusInvalid();
            }
            
            const response = await RegistrationService.validateRegistration(userId, eventId, newStatus);

            res.status(HttpCode.OK).json(response);
        }catch(e: any){
            next(e);
        }
    }

}