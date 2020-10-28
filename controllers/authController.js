// Importar los modulos requeridos
const passport = require("passport");
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuarios");

// Se encarga de autenticar el usuario y de redireccionarlo
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/administrar",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: ["Debes ingresar tus credenciales"],
});