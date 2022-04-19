const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getAllInfo } = require("../Controllers/ControllerDog");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const info = await getAllInfo();
    let weightMin = info.sort((a, b) => {
      if (a.weightMin > b.weightMin) {
        return 1;
      }
      if (b.weightMin > a.weightMin) {
        return -1;
      }
      return 0;
    });
    res.status(200).send(weightMin);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
