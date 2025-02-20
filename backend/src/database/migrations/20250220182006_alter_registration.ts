import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("Registration", function (table) {
        table.dropForeign(["eventId"]);
        
        table.foreign("eventId").references("id").inTable("Event").onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable("Registration", function (table) {
        table.dropForeign(["eventId"]);

        table.foreign("eventId").references("id").inTable("Event");
    });
}

