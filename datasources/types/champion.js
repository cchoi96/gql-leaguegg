require('dotenv').config();

const { RESTDataSource } = require('apollo-datasource-rest');
const { getPatchNumber, getChampionList, getChampionImages } = require('../static');

class ChampionAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL;
    this.dataDragonURL = process.env.DATA_DRAGON_BASE_URL;
  }

  willSendRequest(request) {
    request.headers.set("Origin", this.context.headers.Origin);
    request.headers.set("X-Riot-Token", this.context.headers["X-Riot-Token"]);
  }

  async getFreeChampionRotation() {
    try {
      const patch = await getPatchNumber();
      const championListResponse = await getChampionList();
      const championList = championListResponse.data;
      const championRotation = await this.get("lol/platform/v3/champion-rotations");
      const championRotationIds = championRotation.freeChampionIds;

      return (Array.isArray(championRotationIds)) ?
      championRotationIds.map((id) => this.freeChampionReducer(id, championList, patch)) :
      [];
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  freeChampionReducer(id, champions, patch) {
    const name = Object.keys(champions).find((key) => champions[key].key == id);
    const championInfo = champions[name];

    return {
      id,
      name: championInfo.name,
      title: championInfo.title,
      desc: championInfo.blurb,
      info: championInfo.info,
      image: getChampionImages(id, patch),
      tags: championInfo.tags,
      stats: championInfo.stats,
      resourceType: championInfo.partype
    }
  }
}

module.exports = ChampionAPI;