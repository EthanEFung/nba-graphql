const { RESTDataSource } = require("apollo-datasource-rest");

class StandingsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://data.nba.net/10s/prod/v1/current";
  }

  async getConferenceStandings(confName) {
    const response = await this.get("standings_conference.json");
    return response.league.standard.conference[confName].map(standing =>
      this.standingReducer(standing)
    );
  }

  standingReducer(standing) {
    return {
      teamId: standing.teamId,
      wins: Number(standing.win),
      losses: Number(standing.loss),
      winningPercentage: Number(standing.winPctV2),
      lossPercentage: Number(standing.lossPctV2),
      conferenceStanding: {
        ranking: Number(standing.confRank),
        wins: Number(standing.confWin),
        losses: Number(standing.confLoss)
      },
      divisionStanding: {
        ranking: Number(standing.divRank),
        wins: Number(standing.divWin),
        losses: Number(standing.divLoss)
      },
      winsHome: Number(standing.homeWin),
      lossesHome: Number(standing.homeLoss),
      winsAway: Number(standing.awayWin),
      lossesAway: Number(standing.awayLoss),
      winStreak: Number(standing.streak)
    };
  }
}

module.exports = StandingsAPI;
