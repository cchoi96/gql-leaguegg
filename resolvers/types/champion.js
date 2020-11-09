module.exports = {
  Query: {
    freeChampions: async (_, __, { dataSources }) => dataSources.championAPI.getFreeChampionRotation(),
    champion: async (_, { name }, { dataSources }) => dataSources.championAPI.getChampionData({ name })
  }
};