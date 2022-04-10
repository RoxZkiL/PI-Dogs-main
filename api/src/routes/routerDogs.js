const { Router } = require("express");
const { getAllInfo } = require("../Controllers/ControllerDog");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const info = await getAllInfo();
    if (name) {
      let dogBreed = await info.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      if (dogBreed.length !== 0) {
        res.status(200).send(dogBreed);
      } else {
        res.status(400).send("That Breed doesn't exist");
      }
    } else {
      res.status(200).send(info);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ApiDogInfo = await getAllInfo();
    let DogId = ApiDogInfo.find((el) => el.id === id);
    if (DogId) {
      res.status(200).send(DogId);
    } else {
      res.status(400).send("The Dog id doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
