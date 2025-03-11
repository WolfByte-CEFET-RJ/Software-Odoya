import { v4 } from "uuid";
import { hash } from "bcryptjs";
import { EmailDuplicate, UserNotFound } from "../erros/UserErros";
import User from "../types/user"

import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();

/**
 * @class UserService
 * @description Serviços para Usuário
 */
export default class UserService {
    
    /**
     * @description Realiza a criação do Usuário
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @returns {Promise<string>}
     */
    public static async createUser(name: string, email: string, password: string): Promise<string> {
        const existingUser = await knex("User").where({ email }).first();
        if (existingUser) {
            throw new EmailDuplicate();
        }

        const hashPassword = await hash(password, 10);
        const user = {
            id: v4(),
            name,
            email,
            password: hashPassword
        }
        await knex('User').insert(user);
        return "Usuário Cadastrado";
    }

    /**
     * @description Busca todos os usuários, com exceção do super-usuário
     * @returns {Promise<User[]>}
     */
    public static async getAll(): Promise<User[]>{
        const users: User[] = await knex("User").select('id', 'name', 'email', 'admin', 'points').whereNot({email: process.env.ROOT_EMAIL});

        if(users.length===0){
            throw new UserNotFound()
        }
        
        // Traduzindo campos booleanos
        users.forEach(user => {
            user.admin = Boolean(user.admin);
        });

        return users
    }
}