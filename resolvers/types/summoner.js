module.exports = {
  Query: {
    summoner: async (_, { name }, { dataSources }) => dataSources.summonerAPI.getSummonerData({ name })
  }
};