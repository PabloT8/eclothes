// Importar los módulos requeridos
const express = require("express");
var Producto = require("../models/Producto");
var Carrito = require("../models/carrito");
var Orden = require("../models/orden");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
const productoController = require("../controllers/productoController");
const homeController = require("../controllers/homeController");
const { check } = require("express-validator");
const passport = require("passport");
const orden = require("../models/orden");
//var csrf = require("csurf");



// Configura y mantiene todos los endpoints en el servidor
const router = express.Router();
module.exports = () => {
  //var csrfProtection = csrf();
//router.use(csrfProtection);
  // Rutas disponibles
  

  

  

  router.get("/", homeController.mostrarProductos);

  // Rutas para usuario
  
//luis
  router.get("/cerrar-sesion", authController.cerrarSesion);

  // Rutas para productos
  router.get(
    "/crear-producto",
    //authController.verificarInicioSesion,
    isAdmin,
    productoController.formularioCrearProducto
    
  );

  router.post(
    "/crear-producto",
    //authController.verificarInicioSesion,
    // [
    //   check("imagen", "Debes seleccionar una imagen para el producto")
    //     .not()
    //     .isEmpty(),
    // ],
    productoController.subirImagen,
    [
      check("nombre", "Debes ingresar el nombre del producto")
        .not()
        .isEmpty()
        .escape(),
      check("descripcion", "Debes ingresar la descripción del producto")
        .not()
        .isEmpty()
        .escape(),
      check("precio", "Debes ingresar el precio del producto")
        .not()
        .isEmpty()
        .escape(),
      check("precio", "Valor incorrecto en el precio del producto").isNumeric(),
    ],
    productoController.crearProducto
  );
  
  

  router.get("/perfil", authController.verificarInicioSesion, usuarioController.perfil);
  
  

  router.get("/producto/:url", productoController.verProducto);

  router.get("/carrito/:id", function(req, res, next){
    var productoId = req.params.id;
    var carrito = new Carrito(req.session.carrito ? req.session.carrito : {} );
  
    Producto.findById(productoId, function(err, producto){
     if (err){
        return res.redirect("/");
      }
      carrito.add(producto, producto.id);
      req.session.carrito = carrito;
      console.log(req.session.carrito);
      res.redirect("/");
    });
    
});

router.get("/carrito", function(req, res, next) {
  if (!req.session.carrito){
    return res.render("carrito", {producto: null});
  }
  var carrito = new Carrito(req.session.carrito);
  res.render("carrito", {producto: carrito.generarArray(), precioTotal: carrito.precioTotal});
});

router.get("/gracias", function(req, res, next) {
  var carrito = new Carrito(req.session.carrito);
  var orden = new Orden({
    user: req.user,
    name: req.user.nombre,
    email: req.user.email,
    cart: carrito
  });
  orden.save(function(err, result){
    req.session.carrito = null;
    return res.render("gracias");
  });
  
});

/*router.get("/misCompras",  function(req, res, next) {
  Orden.find({user: req.user}, function(err, ordenes) {
    if (err) {
       return res.write("Error!"); 
     }
     var carrito;
     ordenes.forEach(function(orden){
      carrito =  new Carrito(orden.carrito);
      
       orden.items = carrito.generarArray();
       console.log(orden.items);
     });   
     res.render("misCompras", {ordenes: ordenes});
  });
 });*/
  

 router.use("/", noLogeado,  function(req, res, next){
    next();
  });
 //

 router.get("/crear-cuenta", usuarioController.formularioCrearCuenta);

  router.post(
    "/crear-cuenta",
    [
      // Realizar una verificación de los atributos del formulario
      // https://express-validator.github.io/docs/index.html
      check("nombre", "Debes ingresar tu nombre completo.")
        .not()
        .isEmpty()
        .escape(),
      check("email", "Debes ingresar un correo electrónico.").not().isEmpty(),
      check("email", "El correo electrónico ingresado no es válido.")
        .isEmail()
        .normalizeEmail(),
      check("password", "Debes ingresar una contraseña").not().isEmpty(),
    ],
    usuarioController.crearCuenta
  );

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

  router.get("/olvide-password/:token", authController.formularioNuevoPassword);

  router.post("/olvide-password/:token", authController.almacenarNuevaPassword);

  // Rutas de administración
  router.get("/administrar", (req, res, next) => {
    res.send("Administración del sitio");
  });

  

  

  return router;
};
  
  

//-- Luis
function noLogeado (req, res, next) {
  // Si el usuario se encuentra autenticado que siga con el siguiente middleware
  if (!req.isAuthenticated()){ 
    return next();
  }
 
  // Si no se auntenticó, redireccionar al inicio de sesión
  res.redirect("/");
};
//

function isAdmin (req, res, next) {
  
  // Si el usuario se encuentra autenticado que siga con el siguiente middleware
  if (req.isAuthenticated() && req.user.admin){ 
    return next();
  }
 
  // Si no se auntenticó, redireccionar al inicio de sesión
  res.redirect("/iniciar-sesion");
};






