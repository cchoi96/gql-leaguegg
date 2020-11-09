require('dotenv').config();

const dataDragonURL = process.env.DATA_DRAGON_BASE_URL;

const profileIconUrl = (id, patch) => `${dataDragonURL}/cdn/${patch}/img/profileicon/${id}.png`;

module.exports = {
  profileIconUrl
};