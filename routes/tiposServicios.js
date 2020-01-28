var mongoose = require('mongoose'),
    TiposServicios = mongoose.model('TiposServicios'),
    FechaHora = require('./fechahora')

module.exports = {
    todos: function(solicitud, respuesta){
        TiposServicios.find( function(error, tiposServicios){
            if(error){
                console.log(error);
            } else {
                console.log(tiposServicios);
                respuesta.render("tiposServicios/tiposServicios", 
                    {
                        tiposServicios: tiposServicios
                    }
                );
            }
        });
    },
    nuevo: function(solicitud, respuesta){
        respuesta.render("tiposServicios/nuevo");
    },
    guardar: function(solicitud, respuesta){
        var data = {
            codigo: solicitud.body.codigo,
            nombre: solicitud.body.nombre,
            descripcion: solicitud.body.descripcion
        }

        console.log(data);

        var tipoServicio = new TiposServicios(data);

        tipoServicio.save( function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/tiposServicios/nuevo")
            }
        });
    },
    editar: function(solicitud, respuesta){
        TiposServicios.findById({"_id": solicitud.params.id}, function(error, tipoServicio){
            if(error){
                console.log(error);
            } else {
                respuesta.render("tiposServicios/editar", 
                    {
                        tipoServicio: tipoServicio 
                    }
                );
            }
        });
    },
    eliminar: function(solicitud, respuesta){
        
    },
    actualizar: (solicitud, respuesta) => {
        var data = {
            codigo: solicitud.body.codigo,
            nombre: solicitud.body.nombre,
            descripcion: solicitud.body.descripcion
        };

        console.log(data);

        TiposServicios.findByIdAndUpdate( {"_id": solicitud.params.id }, data,(error)=>{
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/tiposServicios");
            }
        });
    }
}