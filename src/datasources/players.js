const { RESTDataSource } = require("apollo-datasource-rest");
const getYear = require("../utils/getCurrentYear");

class PlayersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://data.nba.net/10s/prod/v1/";
  }

  async getPlayers() {
    const response = await this.get(`${getYear()}/players.json`);
    if (!response || !response.league || !response.league.standard) return [];
    return response.league.standard
      .filter(player => player.teamId.length && player.isActive)
      .map(player => this.playerReducer(player));
  }

  async getPlayersByTeam(id) {
    const response = await this.get(`${getYear()}/players.json`);
    if (!response || !response.league || !response.league.standard) return [];
    return response.league.standard.filter(player => player.teamId === id);
  }

  async getPlayer(id) {
    const response = await this.get(`${getYear()}/players.json`);
    if (!response || !response.league || !response.league.standard) return [];
    const player = response.league.standard.find(
      player => player.personId === id
    );
    return this.playerReducer(player);
  }

  playerReducer(player) {
    return {
      id: player.personId,
      teamId: player.teamId,
      name: {
        first: player.firstName,
        last: player.lastName
      },
      dob: player.dateOfBirthUTC,
      teams: player.teams.length
        ? player.teams.map(team => this.teamReducer(team))
        : [],
      draft: {
        teamId: player.draft.teamId,
        pick: Number(player.draft.pickNum),
        round: Number(player.draft.roundNum),
        year: player.draft.seasonYear
      },
      jersey: Number(player.jersey),
      position: player.position,
      height: {
        feet: player.heightFeet,
        inches: player.heightInches,
        meters: player.heightMeters
      },
      weight: {
        pounds: player.weightPounds,
        kilograms: player.weightKilograms
      }
    };
  }

  teamReducer(team) {
    return {
      id: team.teamId,
      season: {
        start: team.seasonStart,
        end: team.seasonEnd
      }
    };
  }
}

module.exports = PlayersAPI;
