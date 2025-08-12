import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("Metrics").del();

  await knex("Metrics").insert({
    climateInitiatives: 0,
    livesImpacteds: 0,
    kgRecycled: 0,
    sanitationInstalled: 0,
    bets: 0,
    litersTreatedWater: 0,
    partners: JSON.stringify([
      { name: "Company A", logo: "https://example.com/logo-a.png" },
      { name: "Company B", logo: "https://example.com/logo-b.png" }
    ])
  });
}
