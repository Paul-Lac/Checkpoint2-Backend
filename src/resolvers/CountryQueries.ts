import { Resolver, Query, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { dataSource } from "../datasource";

@Resolver(Country)
export class CountryQueries {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[] | null> {
    const countries = await dataSource.manager.find(Country);
    return countries;
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    const country = await dataSource.manager.findOne(Country, {
      where: { code },
    });

    if (!country) {
      throw new Error("Pays non trouvé");
    }

    return country;
  }
}
