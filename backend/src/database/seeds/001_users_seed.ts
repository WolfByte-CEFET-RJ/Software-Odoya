import { Knex } from "knex";
import { v4 } from "uuid";
import { hash } from "bcryptjs";



export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("User").del();

    // const hashPassword = await hash("12345678", 10);
    const hashPassword = await hash("12345678", 10);
    
    // Inserts seed entries
    await knex("User").insert([
        { 
            id: v4(), 
            name: "Administrador",
            email: "administradorodoya@enactus.com",
            password: hashPassword,
            admin: 1,
        },
        { 
            id: v4(), 
            name: "Usuário Teste",
            email: "teste@gmail.com",
            password: hashPassword,
            admin: 0,
            points: 10
        }
    ]);
};
