var mongoose = require('mongoose');
    FechaHora = require('./fechahora');

module.exports = {
    //Método root para solicitar inicio de sesión
    login: function (solicitud, respuesta){
        respuesta.render("index",{
            msg: "Por favor inicie sesión."
        });
    },
    inicio: function (solicitud, respuesta){
        //Encerrar en secuencia try-catch
        Usuarios.findOne({"usuario": solicitud.body.user},function (error,usuario){
            if(error){//Error en cuestion de consulta, conexion,etc
                solicitud.session.error = error;
                respuesta.redirect("/error-inicio/"+solicitud.body.user);
            } else {
                if(!usuario){
                    respuesta.render("login",{
                        msg: "Error: no existe el usuario " + solicitud.body.user
                    });
                }else{
                    if(usuario.password == solicitud.body.pass){
                        solicitud.session.user = usuario;
                        respuesta.redirect('/home');
                    }else{
                        respuesta.render("login",{
                            msg: "Error: contraseña incorrecta."
                        });
                    }
                }
            }
        });
        //
    },
    //Método para cerrar sesión
    logoff: function(solicitud, respuesta){
        if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{
            solicitud.session.user = undefined;
            respuesta.render("login",{
                msg: "Por favor inicie sesión."
            });
        };
    },
    home: function(solicitud, respuesta){
		if(solicitud.session.user === undefined){
			respuesta.redirect("/sesion-expirada");
		}else{//Los if(error) deberan ser manejados con try-catch
            respuesta.redirect('/inicio');
		}
    },
    // Método para mostrar el login con mensaje de error
    expirada: function(solicitud, respuesta){
        respuesta.render("login",{
            msg: "Error: sesión caducada. Vuelva a iniciar sesión."
        });
    }
};