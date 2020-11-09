module.exports = {
  Query: {
    freeChampions: async (_, __, { dataSources }) => dataSources.championAPI.getFreeChampionRotation()
  }
};