const { gql } = require("apollo-server");

const typeDefs = gql`
  extend type Query {
    teams: [Team]!
    team(tricode: String!): Team
  }
  # type Mutation {}

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
`;

module.exports = typeDefs;
