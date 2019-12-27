module.exports = {
  Query: {
    teams: (_, __, { dataSources }) => dataSources.api.getAllTeams(),
    scoreboard: (_, { date }, { dataSources }) =>
      dataSources.api.getScoreboard(date)
  }
};
