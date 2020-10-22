// Importar modulos requeridos para el servidor
const express = require("express");
const exphbs = require("express-handlebars");
//const router = require("./routes/index");

//Habilitar el archivo de variables de entorno
//require("dotenv").config({ path: ".env" });

// Crear un servidor utilizando express
const app = express();

//Implementar router
app.use("/",(req,res,next)=> {
res.send("Bienvenido a e-clothes");

});






app.listen(5000);