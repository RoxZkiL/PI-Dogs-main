const { Router } = require("express");
const { ApiToDbTemps } = require("../Controllers/ControllerTemp");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let AllTempsFromDb = await ApiToDbTemps();
    res.status(200).send(AllTempsFromDb);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
