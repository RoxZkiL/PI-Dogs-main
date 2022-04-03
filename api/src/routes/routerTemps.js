const { Router } = require("express");
const { ApiToDbTemps } = require("../Controllers/ControllerTemp");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let AllTempsFromDb = await ApiToDbTemps();
    // console.log(await ApiToDbTemps());
    res.status(200).json(AllTempsFromDb);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
