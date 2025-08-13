import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable("Event", function (table) {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.string("location").notNullable();
        table.datetime("date").notNullable();
        table.string("meetingPoint").notNullable();
        table.time("estimatedDuration").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists("Event");
}

