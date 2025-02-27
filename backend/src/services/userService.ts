import { v4 } from "uuid";
import { hash } from "bcryptjs";
import { HttpCode, HttpError } from "../erros/erro.config";

import DatabaseConnection from '../database/connection/DatabaseConnection';
const knex = DatabaseConnection.getInstance();

module.exports = {

    async createUser(name: string, email: string, password: string): Promise<string> {
        const existingUser = await knex("User").where({ email }).first();
        if (existingUser) {
            throw new HttpError({status: HttpCode.BAD_REQUEST, message: "Email já em uso"});
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
}