// Importar los módulos requeridos
const mongoose = require("mongoose");
const Producto = mongoose.model("Producto");
const { validationResult } = require("express-validator");
const multer = require("multer"); 
const year = new Date().getFullYear();

//Mostrar el formulario de creacion de producto
exports.formularioCrearProducto = (req, res, next) => {
    res.render("crearProducto", {
        year
    })
};

//Crear un producto 
exports.crearProducto = async (req, res, next) => {
    const errores = validationResult(req);
    const messages = [];

    console.log(errores);
    console.log(req.body);

    //Si hay errores
    if (!errores.isEmpty()) {
        errores.array().map((error) => {
          messages.push({ message: error.msg, alertType: "danger" });
        });
    // Enviar los errores a través de flash messages
    req.flash("messages", messages);    
    res.redirect("/crear-producto");
    } else {
        // Almacenar los valores del producto
        try {
            const { nombre, descripcion, precio, estado } = req.body;

           /* await Producto.create({
                nombre,
                descripcion,
                precio,
                estado,
                imagen: req.file.filename,
              });*/
              messages.push({
                message: "¡Producto agregado correctamente!",
                alertType: "success",
              });
              req.flash("messages", messages);
        
              res.redirect("/crear-producto");
        } catch (error) {
            messages.push({
                message: error,
                alertType: "danger",
              });
              req.flash("messages", messages);
              res.redirect("/crear-producto");
        }
    }



   /* 
    res.redirect("/crear-producto");*/
};

// Permite subir un archivo (imagen) al servidor
    exports.subirImagen = (req, res, next) => {
    //Subir el archivo mediante multer
    upload(req, res, function (error)  {
    if (error) {
        // Errores de Multer
    
    } else {
        //Archivo cargado correctamente
        return next();
    }
    })
}

// Opciones de configuración para multer en productos
const configuracionMulter = {
    //Tamaño máximo del archivo
    limits: {
        fileSize: 100000
    },
    storage: (fileStorage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, `${__dirname}../../public/uploads/products`);
        },
        fileName: (req, res, cb) => {
            
        }
    }))
}