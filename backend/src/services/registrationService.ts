import DatabaseConnection from '../database/connection/DatabaseConnection';
import Registration, { RegistrationStatus } from '../types/registration';
import User from '../types/user';
//fazer yup
import { UserNotFound } from '../erros/UserErros';
import { RegistrationNotFound } from '../erros/RegistrationErros';
import { EventNotFoundError } from '../erros/EventError';

const knex = DatabaseConnection.getInstance();

export default class RegistrationService {
    public static async getRegistrationAll(page: number, limit: number): Promise<Registration[]>{
            const offset = (page - 1) * limit;
    
            const registrations: Registration[] = await knex("Registration")
                                    .join("User", "Registration.userId", "User.id")
                                    .join("Event", "Registration.eventId", "Event.id")
                                    .select('eventId', 'userId', 'Event.name as eventName', 'User.name as userName' , 'status', 'created_at', 'updated_at')
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

        const registrations: Registration[] = await knex("Registration")
                                .join("User", "Registration.userId", "User.id")
                                .join("Event", "Registration.eventId", "Event.id")
                                .select('eventId', 'userId', 'Event.name as eventName', 'User.name as userName' , 'status', 'created_at', 'updated_at')
                                .where('Registration.userId', userId)
                                .orderBy('eventName', 'asc')
                                .limit(limit)
                                .offset(offset);

        if(registrations.length===0){
            throw new Error("nenhum registro encontrado")
        }
        
        return registrations
    }

     public static async getUserSensitiveByEmail(email: string): Promise<User & { password: string }> {
    
            const user = await knex('User').select('id', 'name', 'email', 'admin', 'points', 'password').where({email}).first();
            if (!user) {
                throw new UserNotFound();
            }
            return user;
        }
    
    public static async createRegistration(userId: string, eventId: string): Promise<any> {
        const status = RegistrationStatus.PENDENTE;

        const event = await knex('Event').where({ id: eventId }).first();

        if (!event) {
            throw new EventNotFoundError("Evento não encontrado");
        }
        
        const registrationData = {
            userId,
            eventId,
            status
        };

        await knex('Registration').insert({
            userId: registrationData.userId,
            eventId: registrationData.eventId,
            status: registrationData.status
        });

        return {"message":"Registro em multirão realizado com sucesso"};
    }
    
}