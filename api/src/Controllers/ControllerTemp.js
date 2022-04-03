const axios = require("axios");
const { Temperament } = require("../db");

const ApiToDbTemps = async function () {
  let AllDataFromApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  let tempsFromApi = await AllDataFromApi.data.map((el) => el.temperament);
  tempsFromApi = tempsFromApi.join().split(",");
  tempsFromApi = [...new Set(tempsFromApi)].filter((el) => el).sort();
  // tempsFromApi = [...new Set(tempsFromApi)]; //Si hay alguno repetido lo elimina, y luego lo ordeno
  tempsFromApi = tempsFromApi.map(async (el) => {
    // return {
    //   name: e.trim(), //Con el trim() elimino el espacion que trae adelante cada temperamento.
    // };
    // if (e) {
    await Temperament.findOrCreate({
      where: { name: el.trim() },
    });
    // }
  });
  //Creo un array con el siguiente formato[{name: "nombre del temperamento"}]
  // .filter((e) => e.name);
  //Con el filter me aseguro de traer los elementos correctamente, si solo lo hiciera con el map, el primer temperamento me devuelve una string vacio.
  // const allTemperaments = await Temperament.bulkCreate(tempsFromApi); //Crea en la base de datos/tabla temperaments los names de los temperamentos
  // const allTemperaments = (await Temperament.findAll()).map(
  //   (el) => el.dataValues.name
  // );
  let allTemperaments = await Temperament.findAll();
  return allTemperaments;
  //Retorna los temperamentos de la base de datos
};

module.exports = {
  ApiToDbTemps,
};
