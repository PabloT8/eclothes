// Importar los módulos requeridos
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definición del schema
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  ciudad: String,
  pais: String,
  token: String,
  expira: Date,
  gravatar: String,
  activo: Boolean,
  fechaRegistro: Date,
});
// https://mongoosejs.com/docs/middleware.html#order
// Hooks hash del password (hash + salt)
usuarioSchema.pre("save", function (next) {
  const user = this;

  // Si el password fué modificado
  if (!user.isModified("password")) {
    return next();
  }

  // Generar el salt y si no existe error en la generación
  // realizar el hash del password. Se almacena el hash + salt
  // para evitar ataques rainbow table.
  bcrypt.genSalt(10, (err, salt) => {
    // Si existe un error continuar
    if (err) return next(err);

    // Si se generó el salt, realizar el hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      // Si existe un error continuar
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
// Hooks activar el usuario y almacenar la fecha de registro
usuarioSchema.post("save", function (err, doc, next) {
  // TODO: Revisar la inserción para el hook
  const user = this;

  if (err) return next(err);
  else {
    user.activo = true;
    user.fechaRegistro = Date.now();
    user.save();
  }

  next();
});

module.exports = mongoose.model("Usuarios", usuarioSchema);