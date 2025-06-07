import DatabaseConnection from '../database/connection/DatabaseConnection';
import { UserNotFound } from '../erros/UserErros';
import Registration from '../types/registration';
import User from '../types/user';
//fazer yup
//fazer tratamento de erro
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
                throw new Error("nenhum registro encontrado")
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

     public static async getUserSensitiveByEmail(email: string): Promise<User & { password: string }> {
    
            const user = await knex('User').select('id', 'name', 'email', 'admin', 'points', 'password').where({email}).first();
            if (!user) {
                throw new UserNotFound();
            }
            return user;
        }
    
}