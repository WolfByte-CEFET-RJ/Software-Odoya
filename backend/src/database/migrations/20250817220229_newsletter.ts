import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Newsletter", function (table) {
        table.string('id').primary();
        table.string('link').notNullable();
        table.date('date').notNullable();
        table.text('summary').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("Newsletter");
}

