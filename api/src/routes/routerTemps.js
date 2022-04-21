const { Router } = require("express");
const { ApiToDbTemps } = require("../Controllers/ControllerTemp");
const { Temperament } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let AllTempsFromDb = await ApiToDbTemps();
    res.status(200).json(AllTempsFromDb);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body;
  try {
    let createdTemp = await Temperament.findOrCreate({
      where: {
        name: name,
      },
    });
    res.send(createdTemp);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
