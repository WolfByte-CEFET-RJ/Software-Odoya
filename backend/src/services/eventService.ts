import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();
import { Event, CreateEvent, UpdateEvent } from '../types/event';
import { v4 } from "uuid";
import { EventNotFoundError, RequiredDataError, RequiredEventIdError, UnauthorizedEventAccessError } from '../erros/EventError';
import EventValidator from '../utils/Yup/eventValidator';
import e from 'cors';


export default class EventService{

    /**
     * Obtém mutirões de um usuário comum ou todos os mutirões para admin
     * @param userId ID do usuário
     * @param isAdmin Indica se o usuário é administrador
     */
    public static async getAllEventScheduled(): Promise<Event[]> {
    
        try {
            
            const events: Event[] = await knex("Event").select("*").where("date", ">=", knex.fn.now());
            
            if (!events ||  events.length === 0) {
                return  [];
            }
        return events;
        } catch (error: any) {
            throw new Error(String(error.message));
        }
    }

    public static async getAllEvent(): Promise<Event[]> {
        const events = await knex("Event").select("*");
        
        if (!events ||  events.length === 0) {
            return  [];
        }

        return events;
    }

    /**
     * Obtém um mutirão específico
     * @param id ID do mutirão
     */
    public static async getOneEvent(id: string): Promise<Event> {
        try {
            const event = await knex("Event").select("*").where({ id }).first();

            if (!event) {
                console.log(event)
                throw new Error("Mutirão não encontrado");
            }
            return event;
        } catch (error: any) {
            console.log(error)
            throw new EventNotFoundError();
        }
    }
    
    public static async createEvent(requestBody: CreateEvent) {
        const eventData = {
            ...requestBody,
            date: new Date(requestBody.date)
        };
        await EventValidator.validateCreateEvent(eventData);

        await knex("Event").insert({
            id: v4(),
            name: eventData.name,
            location: eventData.location,
            date: eventData.date,
            meetingPoint: eventData.meetingPoint,
            estimatedDuration: eventData.estimatedDuration
        });

        return {"message": "Mutirão criado"};

    }

    public static async updateEvent(id: string, data: UpdateEvent) {
        
        if(!id) {
            throw new RequiredEventIdError();
        }

        if(!data) {
            throw new RequiredDataError();
        }

        const event = await knex("Event").select("*").where({id}).first();

        if(!event) {
            throw new EventNotFoundError();
        }

        if(data.date) {
            data.date = new Date(data.date);
        }

        await EventValidator.validateUpdateEvent(data);

        await knex("Event").where({id}).update(data);

        return `Mutirão ${event.id} atualizado com sucesso`;

    }

    public static async deleteEvent(id: string) {
        const event = await knex("Event").where({ id }).first();
        const currentDate = new Date();

        if (!event) {
            throw new EventNotFoundError();
        }
    
        if(event.date < currentDate){
            return `Mutirão já ocorreu!`;
        }
        else{
            const deletedCount = await knex("Event").where({ id }).delete();
    
            if (deletedCount === 0) {
                throw new EventNotFoundError();
            }

            return `Mutirão deletado com sucesso`;
        }

       
    }

}