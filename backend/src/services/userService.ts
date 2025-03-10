import { v4 } from "uuid";
import { hash } from "bcryptjs";
import { EmailDuplicate, UserNotFound } from "../erros/UserErros";

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
     * @description Realiza a atualização do Usuário
     * @param {string} id
     * @param {UpdateUserData} data
     * @returns {Promise<string>}
     */
    public static async updateUser(id: string, data: UpdateUserData): Promise<string> {
        const user = await knex('User').where({ id }).first();
        if (!user) {
            throw new UserNotFound();
        }

        if (data.password) {
            const hashPassword = await hash(data.password, 10);
            data.password = hashPassword;
        }

        await knex('User').where({ id }).update({
            name: data.name,
            password: data.password,
        });
        return "Usuário Atualizado";
    }
}

interface UpdateUserData {
    name?: string;
    password?: string;
}
