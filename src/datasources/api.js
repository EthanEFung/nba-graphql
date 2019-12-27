const { RESTDataSource } = require("apollo-datasource-rest");

class API extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://data.nba.net/10s/prod";
  }

  async getAllTeams() {
    const response = await this.get("v2/2019/teams.json");
    if (!response.league || !response.league.standard) return [];

    return response.league.standard.map(team => this.teamReducer(team));
  }

  teamReducer(team) {
    return {
      isNBAFranchise: team.isNBAFranchise,
      isAllStar: team.isAllStar,
      city: team.city,
      fullName: team.fullName,
      tricode: team.tricode,
      teamId: team.teamId,
      nickname: team.nickname,
      urlName: team.urlName,
      teamShortName: team.teamShortName,
      confName: team.confName,
      divName: team.divName
    };
  }

  async getScoreboard(date) {
    const response = await this.get(`v1/${date}/scoreboard.json`);

    return this.scoreboardReducer(response, date);
  }

  scoreboardReducer(response, date) {
    return {
      date,
      nGames: response.numGames,
      games: response.games
        ? response.games.map(game => this.gameReducer(game))
        : []
    };
  }

  gameReducer(game) {
    return {
      startTimeUTC: game.startTimeUTC,
      arena: this.arenaReducer(game.arena),
      period: this.gamePeriodReducer(game.period),
      isActive: game.isGameActivated,
      duration: game.gameDuration,
      visitor: this.gameTeamReducer(game.vTeam),
      home: this.gameTeamReducer(game.hTeam)
    };
  }

  arenaReducer(arena) {
    return {
      name: arena.name,
      isDomestic: arena.isDomestic,
      city: arena.city,
      state: arena.stateAbbr,
      country: arena.country
    };
  }

  gamePeriodReducer(period) {
    return {
      current: period.current,
      type: period.type,
      isHalfTime: period.isHalftime,
      isEndOfPeriod: period.isEndOfPeriod
    };
  }

  gameTeamReducer(gameTeam) {
    return {
      team: gameTeam.triCode, // todo, refactor this so that we can pull all the data for the team
      teamRecord: {
        win: Number(gameTeam.win),
        loss: Number(gameTeam.loss)
      },
      seriesRecord: {
        win: Number(gameTeam.seriesWin),
        loss: Number(gameTeam.seriesLoss)
      },
      score: Number(gameTeam.score)
    };
  }
}

module.exports = API;
