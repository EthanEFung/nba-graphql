module.exports = {
  Query: {
    teams: (_, __, { dataSources }) => dataSources.teams.getAllTeams(),
    team: (_, { tricode }, { dataSources }) =>
      dataSources.teams.getTeam(tricode),
    scoreboard: (_, { date }, { dataSources }) =>
      dataSources.scoreboard.getScoreboard(date),
    game: (_, { date, codeA, codeB }, { dataSources }) =>
      dataSources.scoreboard.getGame(date, codeA, codeB)
  }
};
