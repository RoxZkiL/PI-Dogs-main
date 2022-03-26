const axios = require("axios");

const { Dog, Temperament } = require("../db");

const getApiInfo = async function () {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const infoAPI = await apiURL.data.map((el) => {
    const weightAPI = el.weight.metric.split("-");
    return {
      id: el.id,
      name: el.name,
      height: el.height.metric,
      weightMin: parseInt(weightAPI[0]) ? parseInt(weightAPI[0]) : "",
      weightMax: parseInt(weightAPI[1]) ? parseInt(weightAPI[1]) : "",
      life_span: el.life_span,
      image: el.image.url,
      temperament: el.temperament,
    };
  });
  return infoAPI;
};

const getDBInfo = async function () {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async function () {
  const apiInfoAll = await getApiInfo();
  const dbInfoAll = await getDBInfo();
  const allInfo = apiInfoAll.concat(dbInfoAll);
  return allInfo;
};

module.exports = {
  getAllInfo,
};
