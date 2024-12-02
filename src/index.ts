import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import { cleanDB, dataSource, initCountryData } from "./datasource";
import { CountryMutations } from "./resolvers/CountryMutations";
import { CountryQueries } from "./resolvers/CountryQueries";

const port = 4200;

async function startAppolloServer() {
  const schema = await buildSchema({
    resolvers: [CountryQueries, CountryMutations],
  });
  const server = new ApolloServer({ schema });
  await dataSource.initialize();
  await startStandaloneServer(server, { listen: { port } });
  await cleanDB();
  await initCountryData();

  console.log(`Le serveur a démarré au port : ${port} !`);
}

startAppolloServer();
