const mongoose = require("mongoose");
const Producto = mongoose.model("Producto");

exports.mostrarProductos = async (req, res, next) => {
  // Obtener todos los productos disponibles
  
  const productos = await Producto.find().lean();

  //console.log(productos);

  res.render("buscar", { productos });
};