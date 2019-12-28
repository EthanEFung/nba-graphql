const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schemas");

const TeamsAPI = require("./datasources/teams");
const ScoreboardAPI = require("./datasources/scoreboard");

const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    teams: new TeamsAPI(),
    scoreboard: new ScoreboardAPI()
  })
});

server
  .listen()
  .then(({ url }) => {
    console.log(`apollo server listening on ${url}`);
  })
  .catch(console.error);
