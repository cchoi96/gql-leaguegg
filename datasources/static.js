require('dotenv').config();

const axios = require('axios');
const dataDragonURL = process.env.DATA_DRAGON_BASE_URL;

/** Get the current League of Legends patch number.
 * @ret {string} League of Legends patch. */
const getPatchNumber = async() => {
  try {
    const patches = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json");
    return patches.data[0];
  } catch (err) {
    console.error(err);
    return "10.20.1";
  }
};

/** Get the current list of League of Legends champions.
 * @ret {object} League of Legends champions. */
const getChampionList = async() => {
  try {
    const patch = await getPatchNumber();
    const response = await axios.get(`${dataDragonURL}/cdn/${patch}/data/en_US/champion.json`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const getChampionImages = (id, patch) => {
  return {
    full: `${dataDragonURL}/cdn/img/champion/splash/${id}_0.jpg`,
    icon: `${dataDragonURL}/cdn/${patch}/img/champion/${id}.png`
  }
};

module.exports = {
  getPatchNumber,
  getChampionList,
  getChampionImages
};