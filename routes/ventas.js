var mongoose = require('mongoose'),
    Ventas = mongoose.model('Ventas'),
    Productos = mongoose.model('Productos'),
    Clientes = mongoose.model('Clientes'),
    FechaHora = require('./fechahora'),
    zFill = require('./zfill');

module.exports = {
    todas: function(solicitud, respuesta){
        Ventas.find( function(error, ventas){
            if(error){
                console.log(error);
            } else {
                Productos.find( function(error, productos){
                    if(error){
                        console.log(error);
                    } else {
                        Clientes.find( function(error, clientes){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("ventas/ventas", 
                                    {
                                        ventas: ventas,
                                        productos: productos,
                                        clientes: clientes
                                    }
                                );
                            }
                        });
                    }
                });
            }
        });
    },
    nueva: function(solicitud, respuesta){
        Ventas.find( function(error, ventas){
            if(error){
                console.log(error);
            } else {
                Productos.find( function(error, productos){
                    if(error){
                        console.log(error);
                    } else {
                        Clientes.find( function(error, clientes){
                            if(error){
                                console.log(error);
                            } else {
                                respuesta.render("ventas/nueva", 
                                    {
                                        nTicket: zFill.zfill(ventas.length + 1,5),
                                        productos: productos,
                                        clientes: clientes
                                    }
                                );
                            }
                        });
                    }
                });
            }
        });
    },
    guardar: function(solicitud, respuesta){
        var prod = JSON.parse(solicitud.body.venta);

        Ventas.find( function(error,vtas){
            if(error){
                console.log(error);
            } else {
                var folio = "VTA" + zFill.zfill(vtas.length + 1, 5);
                var ticket = "TCK" + zFill.zfill(vtas.length + 1, 5);
        
                var data = {
                    folio: folio,
                    noTicket: ticket,
                    cliente: solicitud.body.cliente,
                    productos: prod,
                    fecha: FechaHora.obtenerfecha(),
                    hora: FechaHora.obtenerhora(),
                    subtotal: parseFloat(solicitud.body.subtotal).toFixed(2),
                    iva:  parseFloat(solicitud.body.iva).toFixed(2),
                    total:  parseFloat(solicitud.body.total).toFixed(2),
                    pagoCon: solicitud.body.pagoCon,
                    cambio: solicitud.body.cambio
                }
        
                var venta = new Ventas(data);
        
                venta.save( function(error){
                    if(error){
                        console.log(error);
                    } else {
                        prod.forEach( function(p){
                            var dataUpd = { 
                                existencia: parseFloat(p.existencia) - parseFloat(p.cantidad) 
                            }
        
                            Productos.findOneAndUpdate({"_id": p.id}, dataUpd,function(error, res){
                                if(error){
                                    console.log(error);
                                } else {
                                    
                                }
                            });
                        });
                        
                        Productos.find( function(error, productos){
                            if(error){
                                console.log(error);
                            } else {
                                Clientes.find( function(error, clientes){
                                    if(error){
                                        console.log(error);
                                    } else {
                                        respuesta.render("ventas/nueva", 
                                            {
                                                nTicket: zFill.zfill(vtas.length + 1,5),
                                                productos: productos,
                                                clientes: clientes
                                            }
                                        );
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
    }
}