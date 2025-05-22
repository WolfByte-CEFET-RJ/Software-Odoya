import { Request, response, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import EventService from "../services/eventService"
import { Event, CreateEvent } from "../types/event";
import { ImprevistError } from "../erros/ImprevistError";
import { ValidationError } from 'yup';



export default class EventController {

    public static async getAllEventScheduled(req: Request, res: Response) { 
        console.log("Teste");
        
        try {
                const events: Event[] = await EventService.getAllEventScheduled();
                res.status(HttpCode.OK).json(events);
            } catch (e) {
                if (e instanceof HttpError) {
                    return e.sendMessage(res);
                }
    
                const classified_err = new ImprevistError();
                return classified_err.sendMessage(res);
            }
        }

    public static async getAllEvent(req: Request, res: Response) {
        
        try {
                const events: Event[] = await EventService.getAllEvent();
                res.status(HttpCode.OK).json(events);
            } catch (e) {
                if (e instanceof HttpError) {
                    return e.sendMessage(res);
                }
    
                const classified_err = new ImprevistError();
                return classified_err.sendMessage(res);
            }
        }
    
    public static async getOneEvent(req: Request, res: Response) {
        const id  = req.params.id
        try {
                const event: Event = await EventService.getOneEvent(id);
                res.status(HttpCode.OK).json(event);
            } catch (e) {
                if (e instanceof HttpError) {
                    return e.sendMessage(res);
                }
    
                const classified_err = new ImprevistError();
                return classified_err.sendMessage(res);
            }
        }

    public static async createEvent(req: Request, res: Response): Promise<any> {
        const requestBody: CreateEvent = req.body;
        try {
            console.log("Controller OK");
            
            const response = await EventService.createEvent(requestBody);
            res.status(HttpCode.CREATED).json(response);
        } catch (e) {
            if (e instanceof HttpError) {
                    return e.sendMessage(res);
            }
            
            if (e instanceof ValidationError){
                return res.status(HttpCode.BAD_REQUEST).json({ message: e.errors });
            }

            const classified_err = new ImprevistError();
            return classified_err.sendMessage(res);
        }
    }

}