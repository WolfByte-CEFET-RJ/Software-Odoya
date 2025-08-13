import dotenv from 'dotenv';
import { Knex } from "knex";
import { v4 } from "uuid";
import { hash } from "bcryptjs";

dotenv.config();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("User").del();
    
    // Inserts seed entries
    await knex("User").insert([
        { 
            id: v4(), 
            name: "Administrador - RH",
            email: process.env.ROOT_EMAIL,
            password: await hash(String(process.env.ROOT_PASSWORD), Number(process.env.SALT_ROUNDS)),
            admin: true,
        },
        { 
            id: v4(), 
            name: "Usuário Teste",
            email: "teste@gmail.com",
            password: await hash(String(process.env.ROOT_PASSWORD), Number(process.env.SALT_ROUNDS)),
            admin: false,
            points: 10
        }
    ]);
};
