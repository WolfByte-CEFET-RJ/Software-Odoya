import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("Collection_Point", (table) => {
        table.datetime("isFullDate").nullable()
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("Collection_Point", (table) => {
        table.dropColumn("isFullDate");
    })
}

