import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("User", function (table) {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.boolean("admin").defaultTo(false);
        table.integer("points").defaultTo(0);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("User");
}

