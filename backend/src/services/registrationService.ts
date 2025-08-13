import DatabaseConnection from '../database/connection/DatabaseConnection';
import { GroupedRegistration, Registration, RegistrationStatus } from '../types/registration';
import { RegistrationDuplicate, RegistrationNotFound } from '../erros/RegistrationErros';
import { EventNotFoundError } from '../erros/EventError';

const knex = DatabaseConnection.getInstance();

export default class RegistrationService {
    public static async getRegistrationAll(page: number, limit: number): Promise<GroupedRegistration[]>{
        const offset = (page - 1) * limit;
    
        const registrations = await knex("Registration")
            .join("User", "Registration.userId", "User.id")
            .join("Event", "Registration.eventId", "Event.id")
            .select('eventId', 'userId', 'Event.name as eventName', 'User.name as userName' , 'status', 'created_at', 'updated_at')
            .orderBy('eventName', 'asc')
            .limit(limit)
            .offset(offset);
        
            if(registrations.length===0){
                throw new RegistrationNotFound()
            }

            const grouped: GroupedRegistration[] = Object.values(
                registrations.reduce((acc, registrationRow) => {
                    const { eventId, eventName, userId, userName, status, created_at, updated_at } = registrationRow;
                    
                    if (!acc[eventId]) {
                        acc[eventId] = {
                            eventId,
                            eventName,
                            users: []
                        }
                    }

                    acc[eventId].users.push({
                        userId,
                        userName,
                        status,
                        created_at,
                        updated_at
                    });
                    
                    return acc;
                }, {} as Record<string, GroupedRegistration>));

            return grouped;
    }

    public static async getRegistrationByUser(page: number, limit: number, userId: string): Promise<Registration[]>{
        const offset = (page - 1) * limit;

        const registrations: Registration[] = await knex("Registration")
            .join("User", "Registration.userId", "User.id")
            .join("Event", "Registration.eventId", "Event.id")
            .select('eventId', 'userId', 'Event.name as eventName', 'User.name as userName' , 'status', 'created_at', 'updated_at')
            .where('Registration.userId', userId)
            .orderBy('eventName', 'asc')
            .limit(limit)
            .offset(offset);
        
        if(registrations.length===0){
            throw new RegistrationNotFound()
        }
        
        return registrations
    }
    
    public static async createRegistration(userId: string, eventId: string): Promise<any> {
        const status = RegistrationStatus.PENDING;

        const event = await knex('Event').where({ id: eventId }).first();

        if (!event) {
            throw new EventNotFoundError();
        }
        
        const registrationData = {
            userId,
            eventId,
            status
        };

        try {
            await knex('Registration').insert({
                userId: registrationData.userId,
                eventId: registrationData.eventId,
                status: registrationData.status
            });
            
            return {"message":"Registro em mutirão realizado com sucesso"};
        } catch (error) {
            throw new RegistrationDuplicate();
        }
    }
    
}