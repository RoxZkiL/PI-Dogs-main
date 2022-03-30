const axios = require("axios");
const { Temperament } = require("../db");

const ApiToDbTemps = async function () {
  const AllDataFromApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  let tempsFromApi = await AllDataFromApi.data.map((e) => e.temperament);
  tempsFromApi = tempsFromApi.join().split(",");
  tempsFromApi = [...new Set(tempsFromApi)].sort(); //Si hay alguno repetido lo elimina, y luego lo ordeno
  tempsFromApi = tempsFromApi
    .map((e) => {
      return {
        name: e.trim(), //Con el trim() elimino el espacion que trae adelante cada temperamento.
      };
    }) //Creo un array con el siguiente formato[{name: "nombre del temperamento"}]
    .filter((e) => e.name);
  //Con el filter me aseguro de traer los elementos correctamente, si solo lo hiciera con el map, el primer temperamento me devuelve una string vacio.
  console.log(tempsFromApi);
  const allTemperaments = await Temperament.bulkCreate(tempsFromApi); //Crea en la base de datos/tabla temperaments los names de los temperamentos
  return allTemperaments; //Retorna los temperamentos de la base de datos
};

module.exports = {
  ApiToDbTemps,
};
