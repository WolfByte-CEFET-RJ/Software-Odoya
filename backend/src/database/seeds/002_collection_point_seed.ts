import { Knex } from "knex";
import { v4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Collection_Point").del();

    // Inserts seed entries
    await knex("Collection_Point").insert([
        { 
            id: v4(), 
            name: "Ponto de Coleta 1",
            location: "Enactus",
            capacitySpounges: 100,
            amountSponges: 50,
        }
    ]);
};
