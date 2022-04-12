const { Router } = require("express");
const router = Router();
const { Dog } = require("../db");

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id) {
      await Dog.destroy({
        where: { id: id },
      });
    }
    res.send({ msg: "Dog deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
