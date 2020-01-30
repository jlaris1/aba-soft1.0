var mongoose = require('mongoose'),
    Inventarios = mongoose.model('Inventarios'),
    FechaHora = require('./fechahora')
    Productos  = mongoose.model('Productos')
module.exports = {
    todos: function(solicitud, respuesta){
        Inventarios.find(function(error, inventarios){
                if(error){

                }else {
                    respuesta.render("inventarios/inventarios", 
                    {
                        inventarios: inventarios
                    }
                    );
            }
                
        });
        
    },
    nuevo: function(solicitud, respuesta){
        Inventarios.find({},(error, inventarios)=>{
            if(!error){
                respuesta.render("inventarios/nuevo",{
                    inventarios: inventarios
                });
            }
        })
        
    },
    guardar: function(solicitud, respuesta){
        var data = {
            tipo: solicitud.body.tipo,
            descripcion: solicitud.body.descripcion,
            stock: solicitud.body.stock,
            entradas: solicitud.body.entradas,
            productoServicioId: solicitud.body.productoServicioId
        }

        var inventario = new Inventarios(data);

        inventario.save( function(error){
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/inventarios/nuevo")
            }
        });
    },
    editar: function(solicitud, respuesta){
        Inventarios.findById({"_id": solicitud.params.id}, function(error, inventario){
            if(error){
                console.log(error);
            } else {
                // console.log(inventario);
                        respuesta.render("inventarios/editar", 
                    {
                        inventario: inventario 
                       
                    });
                
            }
        });
    },
    eliminar: function(solicitud, respuesta){
        // Inventarios.deleteOne({"_id": solicitud.params.id})
        Inventarios.findByIdAndRemove(solicitud.params.id).exec().then(data =>{
            respuesta.redirect("/inventarios")
        })
    },
    actualizar: (solicitud, respuesta) => {
        console.log('solicitud: ',solicitud.body);
        var data = {
            tipo: solicitud.body.tipo,
            descripcion: solicitud.body.descripcion,
            stock: (Number.parseInt(solicitud.body.stock) + Number.parseInt(solicitud.body.entradas)),
            entradas: solicitud.body.entradas,
            productoServicioId: solicitud.body.productoServicioId
        };

        console.log('Data: ',data);
        Inventarios.findById(solicitud.params.id).exec().then(inve => {
            data.productoServicioId = inve.productoServicioId;
            console.log('Data: ',data);
            Inventarios.findByIdAndUpdate( {"_id": solicitud.params.id }, data,(error)=>{
                if(error){
                    console.log(error);
                } else {
                    Productos.findById({"_id": data.productoServicioId}, function(error, producto){
                        if(!error){
                            producto.existencia = data.stock;
                            Productos.findByIdAndUpdate({"_id": producto.id }, producto,(error)=>{
                                console.log('producto: ',producto);
                                respuesta.redirect("/inventarios");
                            })
                        }
                    })
                    

                }
            });
    })
    }
}