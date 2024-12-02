import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Country } from "../entities/Country";
import { dataSource } from "../datasource";

@InputType()
export class CountryInput {
  @Field()
  code!: string;
  @Field()
  name!: string;
  @Field()
  emoji!: string;
}

@Resolver(Country)
export class CountryMutations {
  @Mutation((_) => Country)
  async createCountry(
    @Arg("countryData") countryData: CountryInput
  ): Promise<Country> {
    try {
      const country = dataSource.manager.create(Country, countryData);
      await dataSource.manager.save(Country, country);
      return country;
    } catch (error) {
      throw new Error("Erreur lors de la création du pays" + error);
    }
  }
}
