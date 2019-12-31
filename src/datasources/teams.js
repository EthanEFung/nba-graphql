const { RESTDataSource } = require("apollo-datasource-rest");

class TeamsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://data.nba.net/10s/prod/v1/2019";
  }

  async getAllTeams() {
    const response = await this.get("teams.json");
    if (!response.league || !response.league.standard) return [];

    return response.league.standard.map(team => this.teamReducer(team));
  }

  async getTeam(id) {
    if (!id) return {};
    const response = await this.get("teams.json");
    if (!response.league || !response.league.standard) return {};
    const team = response.league.standard.find(
      team => team.teamId && team.teamId === id
    );
    return this.teamReducer(team);
  }

  teamReducer(team) {
    return {
      id: team.teamId,
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
}

module.exports = TeamsAPI;
