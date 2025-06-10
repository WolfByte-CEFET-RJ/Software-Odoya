import DatabaseConnection from '../database/connection/DatabaseConnection';
import Registration from '../types/registration';
//fazer yup
import { RegistrationNotFound } from '../erros/RegistrationErros';
const knex = DatabaseConnection.getInstance();

export default class RegistrationService {
    public static async getRegistrationAll(page: number, limit: number): Promise<Registration[]>{
            const offset = (page - 1) * limit;
            
            const registrations: Registration[] = await knex("registration")
                                    .join("user", "Registration.userId", "User.id")
                                    .join("event", "Registration.eventId", "Event.id")
                                    .select('eventId', 'userId', 'event.name as eventName', 'user.name as userName' , 'status', 'created_at', 'updated_at')
                                    .orderBy('eventName', 'asc')
                                    .limit(limit)
                                    .offset(offset);
        
            if(registrations.length===0){
                throw new RegistrationNotFound()
            }
            
            return registrations
        }

    public static async getRegistrationByUser(page: number, limit: number, userId: string): Promise<Registration[]>{
        const offset = (page - 1) * limit;

        const registrations: Registration[] = await knex("registration")
                                .join("user", "Registration.userId", "User.id")
                                .join("event", "Registration.eventId", "Event.id")
                                .select('eventId', 'userId', 'event.name as eventName', 'user.name as userName' , 'status', 'created_at', 'updated_at')
                                .where('Registration.userId', userId)
                                .orderBy('eventName', 'asc')
                                .limit(limit)
                                .offset(offset);

        if(registrations.length===0){
            throw new Error("nenhum registro encontrado")
        }
        
        return registrations
    }
    
}