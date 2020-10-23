// Importar los módulos requeridos
const express = require("express");
const usuarioController = require("../controllers/usuarioController");

// Configura y mantiene todos los endpoints en el servidor
const router = express.Router();

module.exports = () => {
  // Rutas disponibles
  router.get("/", (req, res, next) => {
    res.send("¡Bienvenido a Cashize!");
  });

  // Rutas para usuario
  router.get("/crear-cuenta", usuarioController.formularioCrearCuenta);

  router.post("/registrarse", usuarioController.crearCuenta);

  return router;
}