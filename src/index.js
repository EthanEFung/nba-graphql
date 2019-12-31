const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schemas");

const TeamsAPI = require("./datasources/teams");
const ScoreboardAPI = require("./datasources/scoreboard");
const PlayersAPI = require("./datasources/players");
const StandingsAPI = require("./datasources/standings");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    teams: new TeamsAPI(),
    scoreboard: new ScoreboardAPI(),
    players: new PlayersAPI(),
    standings: new StandingsAPI()
  })
});

server
  .listen()
  .then(({ url }) => {
    console.log(`apollo server listening on ${url}`);
  })
  .catch(console.error);
