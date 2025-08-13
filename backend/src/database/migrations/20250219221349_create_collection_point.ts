import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("Collection_Point", function (table){
        table.uuid("id").primary();
        table.string("name",255).notNullable();
        table.string("location").notNullable();
        table.integer("capacitySpounges").notNullable();
        table.integer("amountSponges").defaultTo(0);
        table.datetime("lastCollectionDate").nullable();
        table.datetime("nextCollectionDate").nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("Collection_Point");
}

