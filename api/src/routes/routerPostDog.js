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
      image,
      temperament,
    } = req.body; //Estos son los datos que me llegan por body
    const createdDog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      image,
    });
    temperament.map(async (el) => {
      try {
        let temps = await Temperament.findAll({
          where: { name: el },
        });
        await createdDog.addTemperament(temps);
      } catch (error) {
        res.send(error);
      }
    });

    //add es un metodo de sequelize que me trae de la tabla el parametro que le paso como parametro en este caso de Temperament
    res.status(200).send("Dog successfully created!!!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
