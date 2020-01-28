var mongoose = require('mongoose'),
    Productos = mongoose.model('Productos'),
    FechaHora = require('./fechahora')
    Inventario = mongoose.model('Inventarios')

module.exports = {
    todos: function(solicitud, respuesta){
        Productos.find( function(error, productos){
            if(error){
                console.log(error);
            } else {
                respuesta.render("productos/productos", 
                    {
                       productos: productos 
                    }
                );
            }
        });
    },
    nuevo: function(solicitud, respuesta){
        respuesta.render("productos/nuevo");
    },
    guardar: function(solicitud, respuesta){
        var data = {
            codigo: solicitud.body.codigo,
            descripcion: solicitud.body.descripcion,
            unidad: solicitud.body.unidad,
            costo: solicitud.body.costo,
            utilidad: solicitud.body.utilidad,
            pUtilidad: solicitud.body.pUtilidad,
            pVenta: solicitud.body.pVenta,
            existencia: solicitud.body.existencia,
            minimo: solicitud.body.minimo,
            maximo: solicitud.body.maximo,
            fecha: FechaHora.obtenerfecha(),
            hora: FechaHora.obtenerhora()
        }

        console.log(data);

        var producto = new Productos(data);

        producto.save( function(error){
            if(error){
                console.log(error);
            } else {
                var descripcion = 'Codigo: ' + data.codigo + ', Nombre: ' + data.nombre
                var inventarioAux = {
                    tipo: 'Producto',
                    descripcion: descripcion,
                    stock: data.existencia,
                    entradas: 0
                }

                var inventario = new Inventario(inventarioAux);
                inventario.save(function(error){
                    respuesta.redirect("/productos/nuevo")
                })
                
            }
        });
    },
    editar: function(solicitud, respuesta){
        Productos.findById({"_id": solicitud.params.id}, function(error, producto){
            if(error){
                console.log(error);
            } else {
                respuesta.render("productos/editar", 
                    {
                       producto: producto 
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
            descripcion: solicitud.body.descripcion,
            unidad: solicitud.body.unidad,
            costo: solicitud.body.costo,
            utilidad: solicitud.body.utilidad,
            pUtilidad: solicitud.body.pUtilidad,
            pVenta: solicitud.body.pVenta,
            existencia: solicitud.body.existencia,
            minimo: solicitud.body.minimo,
            maximo: solicitud.body.maximo
        };

        console.log(data);

        Productos.findByIdAndUpdate( {"_id": solicitud.params.id }, data,(error)=>{
            if(error){
                console.log(error);
            } else {
                respuesta.redirect("/productos");
            }
        });
    }
}