const { gql } = require('apollo-server');
const championTypeDefs = require('./types/champion');
const summonerTypeDefs = require('./types/summoner');

const baseTypeDefs = gql`
  type Query
`;

module.exports = [baseTypeDefs, championTypeDefs, summonerTypeDefs];