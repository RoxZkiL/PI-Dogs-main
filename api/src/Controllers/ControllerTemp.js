const axios = require("axios");
const { Temperament } = require("../db");

const ApiToDbTemps = async function () {
  let AllDataFromApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  let tempsFromApi = await AllDataFromApi.data.map(
    (el) => ` ${el.temperament}`
  );
  tempsFromApi = tempsFromApi.join().split(",").sort();
  tempsFromApi = [...new Set(tempsFromApi)];
  const formatTemperaments = tempsFromApi
    .map((e) => e.trim())
    .filter((e) => e !== "undefined");
  for (let i = 0; i < formatTemperaments.length; i++) {
    const e = formatTemperaments[i];
    await Temperament.findOrCreate({
      where: { name: e },
    });
  }
  let allTemperaments = await Temperament.findAll();
  return allTemperaments;
  //Retorna los temperamentos de la base de datos
};

module.exports = {
  ApiToDbTemps,
};
