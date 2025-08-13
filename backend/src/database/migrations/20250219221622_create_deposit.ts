import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Deposit", (table) => {
        table.uuid("id").primary();
        table.uuid("collectionPointId").notNullable()
            .references("id").inTable("Collection_Point");
        table.uuid("userId").notNullable()
            .references("id").inTable("User");

        table.integer("amountSponges").notNullable();
        table.string("imageURL").nullable();
        table.enum("status", ["PENDENTE", "APROVADO", "REPROVADO"]);
        table.timestamps(true,true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists("Deposit");
}

