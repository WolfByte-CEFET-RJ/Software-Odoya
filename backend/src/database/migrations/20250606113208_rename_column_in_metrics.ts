import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("Metrics", (table) => {
        table.renameColumn("partness", "partners")
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("Metrics", (table) => {
        table.renameColumn("partners", "partness")
    });
}