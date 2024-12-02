import { DataSource } from "typeorm";
import { Country } from "../entities/Country";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db/database.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: "all",
});

export async function cleanDB() {
  await dataSource.manager.clear(Country);
}

export async function initCountryData() {
  const country1 = new Country("FR", "France", "U+1F1EB U+1F1F7");
  await dataSource.manager.save(country1);

  const country2 = new Country("DE", "Allemagne", "U+1F1E9 U+1F1EA");
  await dataSource.manager.save(country2);

  const country3 = new Country("ES", "Espagne", "U+1F1EA U+1F1F8");
  await dataSource.manager.save(country3);
}
