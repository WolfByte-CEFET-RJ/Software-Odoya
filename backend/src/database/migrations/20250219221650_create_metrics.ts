import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Metrics", (table) => {
        table.integer("climateInitiatives").defaultTo(0);
        table.integer("livesImpacteds").defaultTo(0);
        table.integer("kgRecycled").defaultTo(0);
        table.json("partness");
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists("Metrics");
}

