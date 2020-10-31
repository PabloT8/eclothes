// Importar los módulos requeridos
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuarios");
const { validationResult } = require("express-validator");

// Cargar el formulario de la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res, next) => {
  res.render("registrarse", { layout: "auth" });
};

// Procesar el formulario de creación de cuenta
exports.crearCuenta = async (req, res, next) => {

  //verificar que no existen errores de validacion 
  const errores = validationResult(req);
  const erroresArray = [];

  console.log(errores);
  //Si hay errores
  if (!errores.isEmpty){
    //Utilizar funcion map para navegar dentro de un arreglo
    errores.array().map(error => erroresArray.push(error.msg));
    //Agregar errores a mensajes flash
    req.flash("error", erroresArray);
    res.render("registrarse", {
      layout: "auth", 
      messages: req.flash()
    })
  }
  /*  
  // Obtener las variables desde el cuerpo de la petición
  const { nombre, email, password } = req.body;

  // Intentar almacenar los datos del usuario
  try {
    // Crear el usuario
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
    // https://developer.mozilla.org/es/docs/Learn/JavaScript/Asynchronous/Async_await
    await Usuario.create({
      email,
      password,
      nombre,
    });

    // Mostrar un mensaje
  } catch (error) {
    console.log(error);
  }*/
};

// Cargar el formulario de inicio de sesion
exports.formularioIniciarSesion = (req, res, next) => {
  res.render("iniciarSesion", { layout: "auth"});
}