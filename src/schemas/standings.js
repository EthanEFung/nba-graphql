const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    standings(confName: String!): [Standing]!
    standing(teamId: String!): Standing!
  }

  type Standing {
    team(standing: String): Team!
    teamId: String!
    wins: Int!
    losses: Int!
    winningPercentage: Float!
    lossPercentage: Float!
    conferenceStanding: ConferenceStanding!
    divisionStanding: DivisionStanding!
    winsHome: Int!
    lossesHome: Int!
    winsAway: Int!
    lossesAway: Int!
    winStreak: Int!
  }

  type ConferenceStanding {
    ranking: Int!
    wins: Int!
    losses: Int!
  }

  type DivisionStanding {
    ranking: Int!
    wins: Int!
    losses: Int!
  }
`;

module.exports = typeDefs;
