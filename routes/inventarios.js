var mongoose = require('mongoose'),
    Inventarios = mongoose.model('Inventarios'),
    FechaHora = require('./fechahora')
    Productos  = mongoose.model('Productos')
module.exports = {
    todos: function(solicitud, respuesta){
        Inventarios.find(function(error, inventarios){
                if(error){

                }else {
                    // console.log(inventarios);
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

        // console.log(data);

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
                Productos.findByIdAndUpdate( {"_id": inventario.productoServicioId }, productoAux,(error)=>{
                    if(error){
                        console.log(error);
                    } else {
                        console.log(inventario);
                        respuesta.redirect("/inventarios");
                    }
                });

                    //     respuesta.render("inventarios/editar", 
                    // {
                    //     inventario: inventario 
                       
                    // });
                
            }
        });
    },
    eliminar: function(solicitud, respuesta){
        
    },
    actualizar: (solicitud, respuesta) => {
        var data = {
            tipo: solicitud.body.tipo,
            descripcion: solicitud.body.descripcion,
            stock: (solicitud.body.stock + solicitud.body.entradas),
            entradas: solicitud.body.entradas,
            productoServicioId: solicitud.body.productoServicioId
        };

        console.log(data);

        Inventarios.findByIdAndUpdate( {"_id": solicitud.params.id }, data,(error)=>{
            if(error){
                console.log(error);
            } else {
                var productoAux = {
                    existencia: data.stock
                }
                Productos.findByIdAndUpdate( {"_id": data.productoServicioId }, productoAux,(error)=>{
                    if(error){
                        console.log(error);
                    } else {
                        respuesta.redirect("/inventarios");
                    }
                });
                
            }
        });
    }
}