const axios = require("axios");

const { Dog, Temperament } = require("../db");

const getApiInfo = async function () {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const infoAPI = await apiURL.data.map((el) => {
    const heightAPI = el.height.metric.split("-");
    const weightAPI = el.weight.metric.split("-");
    return {
      id: el.id,
      name: el.name,
      heightMin: parseInt(heightAPI[0]) ? parseInt(heightAPI[0]) : "",
      heightMax: parseInt(heightAPI[1]) ? parseInt(heightAPI[1]) : "",
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
    //Con findAll me traigo toda la informacion de la base de datos
    include: {
      model: Temperament, //Esta informacion tiene que incluir el modelo Temperament para que haga la relacion
      // attributes: ["name"], // Traemos el atributo nombre que es lo que nos interesa, trae el perro y el atributo de su temperamento
      // through: {
      //   //mediante los atributos (va siempre)
      //   attributes: [],
      // },
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
