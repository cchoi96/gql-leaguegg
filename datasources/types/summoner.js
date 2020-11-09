require('dotenv').config();

const { RESTDataSource } = require('apollo-datasource-rest');
const { getPatchNumber } = require('../static');
const { profileIconUrl }= require('../../helpers');

class SummonerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL;
  }

  willSendRequest(request) {
    request.headers.set("Origin", this.context.headers.Origin);
    request.headers.set("X-Riot-Token", this.context.headers["X-Riot-Token"]);
  }

  async getSummonerData({ name }) {
    try {
      const summonerData = await this.get(`lol/summoner/v4/summoners/by-name/${name}`);
      const summonerRankedData = await this.get(`lol/league/v4/entries/by-summoner/${summonerData.id}`);
      return this.summonerReducer(summonerData, summonerRankedData);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async summonerReducer(summonerData, rankedData) {
    try {
      const patch = await getPatchNumber();
      return {
        id: summonerData.id,
        accountId: summonerData.accountId,
        name: summonerData.name,
        level: summonerData.summonerLevel,
        ranked: this.summonerRankedReducer(rankedData),
        profileIcon: profileIconUrl(summonerData.profileIconId, patch)
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  summonerRankedReducer(data) {
    return data.map((queue) => {
      return {
        id: queue.summonerId,
        leagueId: queue.leagueId,
        queue: queue.queueType,
        tier: queue.tier,
        rank: queue.rank,
        points: queue.leaguePoints,
        wins: queue.wins,
        losses: queue.losses
      }
    }); 
  }
}

module.exports = SummonerAPI;