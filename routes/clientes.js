var mongoose = require('mongoose'),
    Clientes = mongoose.model('Clientes'),
    FechaHora = require('./fechahora')

module.exports = { 
    todos: function(solicitud, respuesta){
        Clientes.find( function(error, clientes){
            if(error){
                console.log(error);
            } else {
                respuesta.render("clientes/clientes",
                    {
                        clientes: clientes
                    }
                );
            }
        });
    },
    nuevo: function(solicitud, respuesta){
        respuesta.render("clientes/nuevo");
    },
    guardar: function(solicitud, respuesta){
        var data = {
            codigo: solicitud.body.codigo,
            nombre: solicitud.body.nombre,
            identificacion: solicitud.body.identificacion,
            noIdentificacion: solicitud.body.noIdentificacion,
            limiteCredito: solicitud.body.limiteCredito,
            saldo: 0,
            fecha: FechaHora.obtenerfecha(),
            hora: FechaHora.obtenerhora()
        }

        var cliente = new Clientes(data);

        cliente.save( function(error){
            if(error){
                console.log(error);
            } else {
                Clientes.find( function(error, clientes){
                    if(error){
                        console.log(error);
                    } else {
                        respuesta.render("clientes/clientes",
                            {
                                clientes: clientes
                            }
                        );
                    }
                });
            }
        });
    },
    editar: function(solicitud, respuesta){},
    eliminar: function(solicitud, respuesta){},
}