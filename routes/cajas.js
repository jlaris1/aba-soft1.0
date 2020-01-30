var mongoose = require('mongoose'),
    Cajas = mongoose.model('Cajas'),
    AperturaCaja = mongoose.model('AperturaCajas'),
    CorteCaja = mongoose.model('CorteCajas'),
    Usuarios = mongoose.model('Usuarios'),
    FechaHora = require('./fechahora')

module.exports = { 
    todos: function(solicitud, respuesta){
        Cajas.find( function(error, cajas){
            if(error){
                console.log(error);
            } else {
                respuesta.render("cajas/cajas",
                    {
                        cajas: cajas
                    }
                );
            }
        });
    },
    nuevo: function(solicitud, respuesta){
        respuesta.render("cajas/nueva");
    },
    apertura: function(solicitud, respuesta){
        Cajas.find( (error, cajas)=>{
            if(error) {
                console.log(error);
            } else {
                Usuarios.find({rol: 'Cajero'}, (error, cajeros)=>{
                    if(error) {
                        console.log(error);
                    } else {
                        respuesta.render('cajas/apertura', {
                            cajas: cajas,
                            cajeros: cajeros
                        });
                    }
                });
            }
        });
    },
    corte: (solicitud, respuesta)=>{
        Cajas.find( (error, cajas)=>{
            if(error) {
                console.log(error);
            } else {
                Usuarios.find({rol: 'Cajero'}, (error, cajeros)=>{
                    if(error) {
                        console.log(error);
                    } else {
                        respuesta.render('cajas/corte', {
                            cajas: cajas,
                            cajeros: cajeros
                        });
                    }
                });
            }
        });
    },
    guardarCorte: (solicitud, respuesta)=>{
        var data = {
            caja: solicitud.body.caja,
            cajero: solicitud.body.cajero,
            montoInicial: solicitud.body.montoInicial,
            montoFinal: solicitud.body.montoFinal,
            horaEntrada: solicitud.body.horaEntrada,
            horaSalida: solicitud.body.horaSalida
        }

        var corte = new CorteCaja(data);

        corte.save( (error)=>{
            if(error) {

            } else {
                respuesta.render('cajas/corte')
            }
        });

    },
    cerrar: function(solicitud, respuesta){
        respuesta.render("cajas/cerrar");
    },
    guardar: (solicitud, respuesta) => {
        var data = {
            codigo: solicitud.body.codigo,
            nombre: solicitud.body.nombre
        }

        var caja = new Cajas(data);

        caja.save( (error)=>{
            if(error){
                console.log(error);
            } else {
                respuesta.render("cajas/cajas",
                    {
                        cajas: cajas
                    }
                );
            }
        });
    },
    abrir: (solicitud, respuesta) => {
        var data = {
            caja: solicitud.body.caja,
            cajero: solicitud.body.cajero,
            montoInicial: solicitud.body.montoInicial
        }

        var apertura = new AperturaCaja(data);

        apertura.save( (error)=>{
            if(error) {
                console.log(error);
            } else {
                respuesta.render()
            }
        })
    }
}