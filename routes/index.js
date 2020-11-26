// Importar los módulos requeridos
const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const { check } = require("express-validator");

// Configura y mantiene todos los endpoints en el servidor
const router = express.Router();

module.exports = () => {
  // Rutas disponibles
  router.get("/", (req, res, next) => {
    res.send("¡Bienvenido a Cashize!");
  });

  // Rutas para usuario
  router.get("/crear-cuenta", usuarioController.formularioCrearCuenta);

  router.post("/registrarse",[
    //Realizar una verificacion de los atributos del formulario 
    //https://express-validator.github.io/docs/index.html
    check("nombre", "Ingresa tu nombre completo, es requerido")
    .not()
    .isEmpty()
    .escape(),
    check("email", "Ingresa un correo electrónico")
    .not()
    .isEmpty(),
    check("email", "El correo no es válido")
    .isEmail()
    .normalizeEmail(),
    check("password", "Debes ingresar una contraseña")
    .not()
    .isEmpty()],
    usuarioController.crearCuenta
   );

  router.get("/iniciar-sesion", usuarioController.formularioIniciarSesion);

  router.post("/iniciar-sesion", authController.autenticarUsuario);

  router.get("/olvide-password", authController.formularioRestablecerPassword);

  router.post("/olvide-password", authController.enviarToken);

  // Rutas de administración
 router.get("/administrar", (req, res, next )=>{
  res.send("Administración del sitio");

 });
 //Ruta para productos
 router.get("/crear-producto", authController.verificarInicioSesion, (req, res, next) =>{
  res.render("crearProducto");
 });

  return router;
};