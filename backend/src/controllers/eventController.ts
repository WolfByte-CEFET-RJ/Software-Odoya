import { Request, Response } from "express";
import { HttpCode, HttpError } from "../erros/erro.config";
import EventService from "../services/eventService"
import Event from "../types/event";
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


}