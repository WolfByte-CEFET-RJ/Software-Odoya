import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable("Registration", function (table) {
        table.uuid("eventId").notNullable().references("id").inTable("Event");
        table.uuid("userId").notNullable().references("id").inTable("User");
        table.enum("status", ["PENDENTE", "CONFIRMADO", "CANCELADO"]);
        table.primary(["eventId", "userId"]);
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists("Registration");
}

