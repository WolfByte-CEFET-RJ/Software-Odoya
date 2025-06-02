import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Ajuste na tabela Registration
    await knex.schema.alterTable("Registration", function (table) {
        table.dropForeign(["eventId"]);
        table.dropForeign(["userId"]);
    });

    await knex.schema.alterTable("Registration", function (table) {
        table.foreign("eventId").references("Event.id").onDelete("CASCADE");
        table.foreign("userId").references("User.id").onDelete("CASCADE");
    });

    // Ajuste na tabela Deposit
    await knex.schema.alterTable("Deposit", function (table) {
        table.dropForeign(["collectionPointId"]);
        table.dropForeign(["userId"]);
    });

    await knex.schema.alterTable("Deposit", function (table) {
        table.foreign("collectionPointId").references("Collection_Point.id").onDelete("CASCADE");
        table.foreign("userId").references("User.id").onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
    // Reverter ajustes em Registration
    await knex.schema.alterTable("Registration", function (table) {
        table.dropForeign(["eventId"]);
        table.dropForeign(["userId"]);
    });

    await knex.schema.alterTable("Registration", function (table) {
        table.foreign("eventId").references("Event.id");
        table.foreign("userId").references("User.id");
    });

    // Reverter ajustes em Deposit
    await knex.schema.alterTable("Deposit", function (table) {
        table.dropForeign(["collectionPointId"]);
        table.dropForeign(["userId"]);
    });

    await knex.schema.alterTable("Deposit", function (table) {
        table.foreign("collectionPointId").references("Collection_Point.id");
        table.foreign("userId").references("User.id");
    });
}
