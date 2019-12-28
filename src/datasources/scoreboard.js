const { RESTDataSource } = require("apollo-datasource-rest");

class ScoreboardAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://data.nba.net/10s/prod/v1";
  }

  async getScoreboard(date) {
    const response = await this.get(`${date}/scoreboard.json`);

    return this.scoreboardReducer(response, date);
  }

  async getGame(date, codeA, codeB) {
    const response = await this.get(`${date}/scoreboard.json`);

    const game = response.games.find(
      game =>
        (game.hTeam.triCode === codeA && game.vTeam.triCode === codeB) ||
        (game.vTeam.triCode === codeA && game.hTeam.triCode === codeB)
    );
    if (!game) return {};
    return this.gameReducer(game);
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

module.exports = ScoreboardAPI;
