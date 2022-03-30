const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      temperament,
    } = req.body;
    const createdDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
    }); //Estos son los datos que me llegan por body
    temperament.map(async (el) => {
      try {
        let [id1, b1] = await Temperament.findOrCreate({
          //encontramos el temperamento "el"
          where: { name: el },
        });
        await createdDog.addTemperament(id1); //agrego temperamento "el" (id1) en el Dog que cree (createdDog)
      } catch (error) {
        res.send(error);
      }
    });
    // let temperamentDb = await Temperament.findAll({
    //   where: { name: temperaments }, //Donde el name sea igual al temperament que me llega por body
    // }); //Esto lo traigo del modelo de Temperament
    // createdDog.addTemperament(temperamentDb); //add es un metodo de sequelize que me trae de la tabla el parametro que le paso como parametro en este caso de Temperament
    res.status(200).send("Dog successfully created!!!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
