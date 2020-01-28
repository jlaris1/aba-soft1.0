var mongoose = require('mongoose'),
    Servicios = mongoose.model('Servicios'),
    FechaHora = require('./fechahora')
    TiposServicios = mongoose.model('TiposServicios')

module.exports = {
    todos: function(solicitud, respuesta){
        Servicios.find({}, function(error, servicios){
                TiposServicios.populate(servicios, {path: "tipoServicio"}, function(err, servicios)
            {
                console.log(servicios);
                respuesta.render("servicios/servicios", 
                {
                   servicios: servicios
                }
                );
            });
                
        });
        
    },
    nuevo: function(solicitud, respuesta){
        TiposServicios.find({},(error, tiposServicios)=>{
            if(!error){
                respuesta.render("servicios/nuevo",{
                    tiposServicios: tiposServicios
                });
            }
        })
        
    },
    guardar: function(solicitud, respuesta){
        var data = {
            codigo: solicitud.body.codigo,
            descripcion: solicitud.body.descripcion,
            costo: solicitud.body.costo,
            utilidad: solicitud.body.utilidad,
            pUtilidad: solicitud.body.pUtilidad,
            pVenta: solicitud.body.pVenta,
            fecha: FechaHora.obtenerfecha(),
            hora: FechaHora.obtenerhora(),
            tipoServicio: solicitud.body.tipoServicio
        }

        console.log(data);

        var servicio = new Servicios(data);

        servicio.save( function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/servicios/nuevo")
            }
        });
    },
    editar: function(solicitud, respuesta){
        Servicios.findById({"_id": solicitud.params.id}, function(error, servicio){
            if(error){
                console.log(error);
            } else {
                console.log(servicio);
                TiposServicios.find({},(error, tiposServicios)=>{
                    if(!error){

                        respuesta.render("servicios/editar", 
                    {
                        tiposServicios: tiposServicios,
                        servicio: servicio 
                       
                    });
                    }
                })


                
            }
        });
    },
    eliminar: function(solicitud, respuesta){
        
    },
    actualizar: (solicitud, respuesta) => {
        var data = {
            codigo: solicitud.body.codigo,
            descripcion: solicitud.body.descripcion,
            costo: solicitud.body.costo,
            utilidad: solicitud.body.utilidad,
            pUtilidad: solicitud.body.pUtilidad,
            pVenta: solicitud.body.pVenta,
            tipoServicio: solicitud.body.tipoServicio
        };

        console.log(data);

        Servicios.findByIdAndUpdate( {"_id": solicitud.params.id }, data,(error)=>{
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/servicios");
            }
        });
    }
}