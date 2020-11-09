require('dotenv').config();

const axios = require('axios');
const _ = require('lodash');
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

  async getChampionData({ name }) {
    try {
      const patch = await getPatchNumber();
      const response = await axios.get(`${this.dataDragonURL}/cdn/${patch}/data/en_US/champion/${_.capitalize(name)}.json`);
      const championData = response?.data?.data;
      if (championData) return await this.riotChampionReducer(patch, championData[Object.keys(championData)[0]]);
    } catch(err) {
      const status = err.response.status;
      // need to handle errors better, 403 if not found, potentially throw error and handle on client
      console.error((status == 403 || status == 404) ? `Champion ${champion} cannot be found.` : err);
    }
  }

  async riotChampionReducer(patch, data) {
    const id = data.key;
    return {
      id,
      name: data.name,
      title: data.title,
      desc: data.lore,
      info: data.info,
      image: getChampionImages(id, patch),
      tags: data.tags,
      stats: data.stats,
      allytips: data.allytips,
      enemytips: data.enemytips,
      resourceType: data.partype,
      spells: data.spells.map(spell => this.spellReducer(patch, spell)),
      passive: this.spellReducer(patch, data.passive)
    }
  }

  spellReducer(patch, spell) {
    return {
      id: spell.id,
      name: spell.name,
      desc: spell.description,
      image: `${this.dataDragonURL}/cdn/${patch}/img/spell/${spell.image.full}`
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