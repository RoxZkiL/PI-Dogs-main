const { Router } = require("express");
const routerDogs = require("./routerDogs");
const routerPostDog = require("./routerPostDog");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routerDogs);
router.use("/dog", routerPostDog);

module.exports = router;
