require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers/index');
const dataSources = require('./datasources/index');
const apiKey = process.env.RIOT_API_KEY;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: () => {
    return {
      headers: {
        Origin: "https://developer.riotgames.com",
        "X-Riot-Token": apiKey,
      }
    }
  },
  introspection: true,
  playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}!`);
});