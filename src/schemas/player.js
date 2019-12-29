const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    players: [Player]!
    player(id: String!): Player!
  }

  type Player {
    team(player: String): Team!
    id: String!
    teamId: String!
    name: Name!
    dob: String!
    draft: Draft!

    teams: [TeamHistory]!
    jersey: Int!
    position: String!
    height: Height!
    weight: Weight!
  }

  type Name {
    first: String!
    last: String!
  }

  type Draft {
    teamId: String!
    pick: Int!
    round: Int!
    year: String!
  }

  type TeamHistory {
    team(TeamHistory: String): Team!
    season: Season!
  }

  type Season {
    start: String!
    end: String!
  }

  type Height {
    feet: String!
    inches: String!

    meters: String!
  }

  type Weight {
    pounds: Float!
    kilograms: Float!
  }
`;

module.exports = typeDefs;
