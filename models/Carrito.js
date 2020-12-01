//Importar los modulos requeridos
const mongoose = require("mongoose");

//Definicion del schema
const carritoSchema = new mongoose.Schema({
    producto: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Producto",
            required: true
        }
    ],
    usuario: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuarios",
        required: true,
        unique: true,
    },
    fecha: Date,
    total: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Carrito", carritoSchema);