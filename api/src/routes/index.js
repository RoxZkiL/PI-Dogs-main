const { Router } = require("express");
const routerDog = require("./routerDog");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routerDog);

module.exports = router;
