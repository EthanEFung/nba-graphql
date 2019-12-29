const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schemas");

const TeamsAPI = require("./datasources/teams");
const ScoreboardAPI = require("./datasources/scoreboard");
const PlayersAPI = require("./datasources/players");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    teams: new TeamsAPI(),
    scoreboard: new ScoreboardAPI(),
    players: new PlayersAPI()
  })
});

server
  .listen()
  .then(({ url }) => {
    console.log(`apollo server listening on ${url}`);
  })
  .catch(console.error);
