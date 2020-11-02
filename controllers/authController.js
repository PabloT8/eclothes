// Importar los modulos requeridos
const passport = require("passport");
const mongoose = require("mongoose");
const crypto = require("crypto");
const Usuario = mongoose.model("Usuarios");
const enviarCorreo = require("../handlers/email");

// Se encarga de autenticar el usuario y de redireccionarlo
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/administrar",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: ["Debes ingresar tus credenciales"],
});

// Cerrar la sesión del usuario
exports.cerrarSesion = (req, res, next) => {
    // Cierra la sesión
    req.logout();
  
    req.flash("success", [
      "Has cerrado correctamente tu sesión. ¡Vuelve pronto!",
    ]);

    return res.redirect("/iniciar-sesion");
};

// Mostrar el formulario de restablecer la contraseña
exports.formularioRestablecerPassword = (req, res, next) => {
  res.render("restablecerPassword", {
    layout: "auth",
    typePage: "register-page",
    signButtonValue: "/iniciar-sesion",
    signButtonText: "Iniciar sesion",
    year: new Date().getFullYear(),
    messages: req.flash(),  
  });
  
}

// Enviamos un token de autenticación al usuario para cambiar su
// contraseña. El token se envía al correo del usuario.
exports.enviarToken = async (req, res, next) => {
  // Obtener la direccion de correo electronico
  const { email } = req.body;
  const messages = { messages: [] }

  // Buscar el usuario
  try {
    const usuario =  await Usuario.findOne({ email });


  //Si el usuario no existe
  if (!usuario) {
    messages.messages.push({messages: "No existe una cuenta registrada con este correo electronico",
    alertType: "danger"
  });

  req.flash(messages);

  res.redirect("/olvide-password");
  }

  //El usuario existe, generar un token y una fecha de vencimiento
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expira = Date.now() + 3600000;

  // Guardar los cambios
  await usuario.save();

  // Generar la URL de restablecer contrasena
  const resetUrl = 'http://${req.headers.host}/olvide-password/${usuario.token}';


  try {
    //Enviar la notificacion al correo electronico del usuario
  const sendMail = await enviarCorreo.enviarCorreo({
    to: usuario.email,
    subject: "Restablecer tu contrasena en Eclothes",
    template: "resetPassword",
    resetUrl,
  });

  } catch (error) {
    console.log(error);
  }
  

  // Redireccionar al incio de sesion
  messages.messages.push({
    messages: "Verifica tu bandeja de entrada y sigue las instrucciones",
    alertType: "success",
  });

  req.flash(messages);

  res.redirect("/iniciar-sesion");
  } catch (error){
    messages.messages.push({messages: "Ocurrio un error al momento de comunicarse con el servidor, favor intentar nuevamente",
    alertType: "danger",
  });

  req.flash(messages);
  }

 
};