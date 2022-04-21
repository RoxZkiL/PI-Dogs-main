const axios = require("axios");

const { Dog, Temperament } = require("../db");

const getApiInfo = async function () {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const infoAPI = await apiURL.data.map((el) => {
    const heightAPI = el.height.metric.split("-");
    const weightAPI = el.weight.metric.split("-");
    return {
      id: `${el.id}`,
      name: el.name,
      heightMin: parseInt(heightAPI[0]) ? parseInt(heightAPI[0]) : 27,
      heightMax: parseInt(heightAPI[1]) ? parseInt(heightAPI[1]) : 41,
      weightMin: parseInt(weightAPI[0]) ? parseInt(weightAPI[0]) : 25,
      weightMax: parseInt(weightAPI[1]) ? parseInt(weightAPI[1]) : 36,
      life_span: el.life_span,
      image: el.image.url
        ? el.image.url
        : "https://i.ytimg.com/vi/0oBx7Jg4m-o/maxresdefault.jpg",
      temperament: el.temperament,
    };
  });
  return infoAPI;
};

const getDBInfo = async function () {
  return await Dog.findAll({
    include: {
      model: Temperament,
    },
  });
};

const getAllInfo = async function () {
  const apiInfoAll = await getApiInfo();
  let dbInfoAll = await getDBInfo();
  dbInfoAll = await dbInfoAll.map((el) => {
    return {
      id: el.id,
      name: el.name,
      heightMin: el.heightMin,
      heightMax: el.heightMax,
      weightMin: el.weightMin,
      weightMax: el.weightMax,
      life_span: el.life_span,
      image: el.image
        ? el.image
        : "https://i.ytimg.com/vi/0oBx7Jg4m-o/maxresdefault.jpg",
      temperament: el.temperaments
        .map((el) => {
          return el.name;
        })
        .join(", "),
    };
  });
  const allInfo = apiInfoAll.concat(dbInfoAll);
  return allInfo;
};

module.exports = {
  getAllInfo,
  getDBInfo,
};
