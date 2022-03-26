const { Router } = require("express");
const { getAllInfo } = require("../Controllers/ControllerDog");

const router = Router();

router.get("/", async (req, res) => {
  const info = await getAllInfo();
  res.send(info);
});

module.exports = router;
