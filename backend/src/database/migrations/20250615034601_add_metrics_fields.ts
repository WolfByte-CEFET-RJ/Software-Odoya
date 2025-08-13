import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("Metrics", (table) => {
    table.integer("sanitationInstalled").defaultTo(0);
    table.integer("bets").defaultTo(0);
    table.integer("litersTreatedWater").defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("Metrics", (table) => {
    table.dropColumn("sanitationInstalled");
    table.dropColumn("bets");
    table.dropColumn("litersTreatedWater");
  });
}
