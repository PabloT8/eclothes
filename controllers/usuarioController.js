// Importar los módulos requeridos
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuarios");
const { validationResult } = require("express-validator");

const year = new Date().getFullYear();

// Cargar el formulario de la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res, next) => {
  res.render("registrarse", {
    layout: "auth",
    typePage: "register-page",
    signButtonValue: "/iniciar-sesion",
    signButtonText: "Iniciar sesión",
    year,
  });
};

// Procesar el formulario de creación de cuenta
exports.crearCuenta = async (req, res, next) => {
  // Verificar que no existan errores de validación
  const errores = validationResult(req);
  const messages = [];
  // Obtener las variables desde el cuerpo de la petición
  const { nombre, email, password ,direccion,
    telefono,
    ciudad} = req.body;

  // Si hay errores
  if (!errores.isEmpty()) {
    // Utilizar la función map para navegar dentro de un arreglo
    errores
      .array()
      .map((error) =>
        messages.push({ message: error.msg, alertType: "danger" })
      );

    // Agregar los errores a nuestro mensajes flash
    req.flash("messages", messages);

    res.redirect("/crear-cuenta");
  } else {
    // Intentar almacenar los datos del usuario
    try {
      // Crear el usuario
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
      // https://developer.mozilla.org/es/docs/Learn/JavaScript/Asynchronous/Async_await
      await Usuario.create({
        email,
        password,
        nombre,
        direccion,
        ciudad
        ,telefono,
        admin: false
      });

      // Mostrar un mensaje
      messages.push({
        message: "!Usuario creado satisfactoriamente!",
        alertType: "success",
      });
      req.flash("messages", messages);

      res.redirect("/iniciar-sesion");
    } catch (error) {
      messages.push({
        message: error,
        alertType: "danger",
      });
      req.flash("messages", messages);
      res.redirect("/crear-cuenta");
    }
  }
};

// Cargar el formulario de inicio de sesión
exports.formularioIniciarSesion = (req, res, next) => {
  res.render("iniciarSesion", {
    layout: "auth",
    typePage: "login-page",
    signButtonValue: "/crear-cuenta",
    signButtonText: "Regístrate",
    year,
  });
};


exports.modificarUsuario = async (req, res, next) => {
  const {nombre, telefono, ciudad,direccion } = req.body;
  try {
    const email = req.user.email;
    const usuario = await Usuario.findOne({email});
    usuario.telefono = telefono;
    usuario.direccion = direccion;
    usuario.nombre=nombre;
    
    usuario.ciudad = ciudad;
    console.log(usuario);
    await usuario.save();
    res.redirect("/perfil");
  } catch (error) {
    res.redirect("/perfil");
  }
 
}







exports.perfil = (req, res, next) => {
  res.locals.role = req.user.admin;
  const usuarios = req.user.nombre;
  
    nombre = req.user.nombre;
    direccion=req.user.direccion;
    ciudad=req.user.ciudad;
    telefono=req.user.telefono;
    
  
    res.render("perfil", {
        usuarios,
        email: req.user.email,
        telefono,
        ciudad,
        direccion,
        
    });

   
}





exports.usuariomain = (req, res, next) => {
  const usuarios = req.user.nombre;
  
    nombre = req.user.nombre;
    
  
    res.render("/layouts/main", {
        usuarios,
        email: req.user.email,
        nombre
    });

   
}
