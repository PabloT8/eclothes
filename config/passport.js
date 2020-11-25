//Importar los moodulos requeridos
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuarios");

//Configurar la estrategia local de autenticacion
passport.use(

    new LocalStrategy({
        
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            
            //Verificar si el usuario existe en la BD
            const usuario = await Usuario.findOne({ email });

            //Si el usuario no existe 
            if (!usuario) {
                return done(
                    null,
                    false,
                    req.flash("messages", [
                        {
                          message: "¡El correo electrónico no se encuentra registrado!",
                          alertType: "danger",
                        },
                      ])
                    );
            }
            //Si el usuario existe, verificar si la contrasena es correcta
            const verificarPassword = await usuario.comparePassword(password);

      console.log(verificarPassword);

            //Si la contraseña es incorrecta
            if(!verificarPassword){
                return done(null, false, req.flash("messages", [
                    {
                      message: "¡La contraseña ingresada es incorrecta!",
                      alertType: "danger",
                    },
                  ])
                );
            }

            //El usuario existe y la contrasena enviada es correcta
            return done(null, usuario);
        }
    )
);

//Serializar el usuario dentro de la sesion
passport.serializeUser((usuario, done) => done(null, usuario._id));

//Deserializar el usuario desde la sesion
passport.deserializeUser(async (id, done) => {
   try {
    const usuario = await (await Usuario.findById(id)).exec();

    return done(null, usuario);
   } catch (error) {
       console.log(error);
   }
});

module.exports = passport;