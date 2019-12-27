const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    teams: [Team]!
    team(id: ID!): Team
    scoreboard(date: String!): Scoreboard!
  }

  # type Mutation {
  # }

  type Team {
    isNBAFranchise: Boolean!
    isAllStar: Boolean!
    city: String!
    fullName: String!
    tricode: String!
    teamId: String!
    nickname: String!
    urlName: String!
    teamShortName: String!
    confName: String!
    divName: String
  }

  type Scoreboard {
    date: String!
    nGames: Int!
    games: [Game]!
  }

  type Game {
    startTimeUTC: String!
    arena: Arena!
    period: Period!
    isActive: Boolean!
    duration: Duration!
    visitor: GameTeam!
    home: GameTeam!
  }

  type Arena {
    name: String!
    isDomestic: Boolean!
    city: String!
    state: String!
    country: String!
  }

  type Period {
    current: Int
    type: Int
    isHalfTime: Boolean!
    isEndOfPeriod: Boolean!
  }

  type Duration {
    hours: String!
    minutes: String!
  }

  type GameTeam {
    team: String!
    teamRecord: Record
    seriesRecord: Record
    score: Int
  }

  type Record {
    win: Int!
    loss: Int!
  }
`;

module.exports = typeDefs;
