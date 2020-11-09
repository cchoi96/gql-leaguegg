const _ = require('lodash');
const championResolvers = require('./types/champion');
const summonerResolvers = require('./types/summoner');

module.exports = _.merge({}, championResolvers, summonerResolvers);