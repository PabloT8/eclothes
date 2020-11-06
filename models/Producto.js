//Importar modulos requeridos
const mongoose = require("mongoose");
const shortid = require(shortid);
//Definicion del schema
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
    },
    fechaCreacion: Date,
    url: {
        type: String,
        lowercase: true,
    },
    etiquetas: [String],
    vendedor: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    comprador: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
    },
    fechaVenta: Date,
})
//Hooks para generar URL del producto
productoSchema.pre("save", function(next){
    //Crear URL
    const url = slug(this.nombre);
    this.url = '${url}-${shortid.geenerate()}';
    next();
})
//Generar un indice para mejorar la busqueda por el nombre del producto
productoSchema.index({ nombre: "text" });
module.exports = mongoose.model("Producto", productoSchema);