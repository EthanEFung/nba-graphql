const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    teams: [Team]!
    team(id: String!): Team
  }
  # type Mutation {}

  type Team {
    players(team: String): [Player]!
    id: String!
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
`;

module.exports = typeDefs;
