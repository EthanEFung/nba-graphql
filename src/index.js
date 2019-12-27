const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const api = require("./datasources/api");

const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    api: new api()
  })
});

server
  .listen()
  .then(({ url }) => {
    console.log(`apollo server listening on ${url}`);
  })
  .catch(console.error);
