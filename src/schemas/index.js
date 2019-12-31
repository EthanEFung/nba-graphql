const { gql } = require("apollo-server");
const team = require("./team");
const scoreboard = require("./scoreboard");
const player = require("./player");
const standings = require("./standings");

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

module.exports = [root, team, scoreboard, player, standings];
