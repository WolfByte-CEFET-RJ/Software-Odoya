import { NextFunction, Request, response, Response } from "express";
import { HttpCode } from "../erros/erro.config";
import EventService from "../services/eventService"
import { Event, CreateEvent, UpdateEvent } from "../types/event";

export default class EventController {

    public static async getAllEventScheduled(req: Request, res: Response, next: NextFunction) { 
        try {
            const events: Event[] = await EventService.getAllEventScheduled();
            res.status(HttpCode.OK).json(events);
        
        } catch (e: any) {
            next(e);
        }
    }

    public static async getAllEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const events: Event[] = await EventService.getAllEvent();
            res.status(HttpCode.OK).json(events);

        } catch (e) {
            next(e);
        }
    }
    
    public static async getOneEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id  = req.params.id
            
            const event: Event = await EventService.getOneEvent(id);
            res.status(HttpCode.OK).json(event);
        
        } catch (e) {
            next(e);
        }
    }

    public static async createEvent(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const requestBody: CreateEvent = req.body;
            
            const response = await EventService.createEvent(requestBody);
            res.status(HttpCode.CREATED).json(response);
        
        } catch (e) {
            next(e);
        }
    }

    public static async updateEvent(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const data: UpdateEvent = req.body;
        
            const response = await EventService.updateEvent(id, data);
            res.status(HttpCode.OK).json({"message": response});
        
        } catch (e) {
            next(e);
        }
    }

    public static async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            
            await EventService.deleteEvent(id);
            res.status(HttpCode.NO_CONTENT).send();
        
        } catch (e) {
            next(e);
        }
    }
}