const ChampionAPI = require('./types/champion');
const SummonerAPI = require('./types/summoner');

module.exports = () => ({
  championAPI: new ChampionAPI(),
  summonerAPI: new SummonerAPI()
});