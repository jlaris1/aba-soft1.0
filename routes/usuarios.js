var mongoose = require('mongoose'),
    Usuarios = mongoose.model('Usuarios'),
    FechaHora = require('./fechahora')

module.exports = {
    todos: function(solicitud, respuesta){
        Usuarios.find( function(error, usuarios){
            if(error){
                console.log(error);
            } else {
                respuesta.render("usuarios/usuarios",
                    {
                        usuarios: usuarios
                    }
                );
            }
        });
    },
    nuevo: function(solicitud, respuesta){
        respuesta.render("usuarios/nuevo");
    },
    guardar: function(solicitud, respuesta){
        var data = {
            nombre: solicitud.body.nombre,
            usuario: solicitud.body.usuario,
            password: solicitud.body.password,
            permisos: solicitud.body.permisos,
            fecha: FechaHora.obtenerfecha(),
            hora: FechaHora.obtenerhora()
        }

        var usuario = new Usuarios(data);

        usuario.save( function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/usuarios");
            }
        });
    }
}