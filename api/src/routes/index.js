const { Router } = require("express");
const routerDogs = require("./routerDogs");
const routerPostDog = require("./routerPostDog");
const routerTemps = require("./routerTemps");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routerDogs);
router.use("/dog", routerPostDog);
router.use("/temperament", routerTemps);

module.exports = router;
