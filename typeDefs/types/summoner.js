const { gql } = require('apollo-server');

module.exports = gql`
  type Summoner {
    id: String!
    accountId: String!
    name: String!
    level: Int
    profileIcon: String
    revisionDate: Int
    ranked: [SummonerRanked]
  }

  type SummonerRanked {
    id: String!
    leagueId: String!
    queue: String!
    tier: String
    rank: String
    points: Int
    wins: Int
    losses: Int
  }

  extend type Query {
    summoner(name: String): Summoner
  }
`;