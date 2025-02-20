import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("Collection_Point", (table) => {
        table.boolean("isInactive").defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("Collection_Point", (table) => {
        table.dropColumn("isInactive");
    });
}

