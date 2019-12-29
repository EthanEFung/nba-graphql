const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    scoreboard(date: String!): Scoreboard!
    game(date: String!, codeA: String!, codeB: String!): Game!
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
    state: String
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
    team(gameTeam: String): Team!
    tricode: String
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
