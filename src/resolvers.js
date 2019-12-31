const getYear = require("./utils/getCurrentYear");

module.exports = {
  Query: {
    teams: (_, __, { dataSources }) => dataSources.teams.getAllTeams(),
    team: (_, { id }, { dataSources }) => dataSources.teams.getTeam(id),
    scoreboard: (_, { date }, { dataSources }) =>
      dataSources.scoreboard.getScoreboard(date),
    game: (_, { date, codeA, codeB }, { dataSources }) =>
      dataSources.scoreboard.getGame(date, codeA, codeB),
    players: (_, __, { dataSources }) => dataSources.players.getPlayers(),
    player: (_, { id }, { dataSources }) => dataSources.players.getPlayer(id),
    standings: (_, { confName }, { dataSources }) =>
      dataSources.standings.getConferenceStandings(confName)
  },
  GameTeam: {
    team: (gameTeam, __, { dataSources }) =>
      dataSources.teams.getTeam(gameTeam.id)
  },
  Player: {
    team: (player, __, { dataSources }) =>
      dataSources.teams.getTeam(player.teamId)
  },
  Team: {
    players: (team, __, { dataSources }) =>
      dataSources.players.getPlayersByTeam(team.id)
  },
  Standing: {
    team: (standing, __, { dataSources }) =>
      dataSources.teams.getTeam(standing.teamId)
  }
};
