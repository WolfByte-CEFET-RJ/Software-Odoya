import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("User", function (table) {
        table.string("password").nullable().alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("User", function (table) {
        table.string("password").notNullable().alter();
    });
}
