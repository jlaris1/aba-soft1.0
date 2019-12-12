var express = require('express');

module.exports = function(app){
    // SESION
    var sesion = require('../routes/sesion');

    // USUARIOS
    var usuarios = require('../routes/usuarios');
    var usuariosRouter = express.Router();

    // PRODUCTOS
    var productos = require('../routes/productos');
    var productosRouter = express.Router();

    // VENTAS
    var ventas = require('../routes/ventas');
    var ventasRouter = express.Router();


    // CLIENTES
    var clientes = require('../routes/clientes');
    var clientesRouter = express.Router();

    //Sesion
    app.get('/', sesion.login);
    app.post('/inicio', sesion.inicio);
    app.get('/home', sesion.home);
    app.get('/cerrar_sesion', sesion.logoff);
    app.get('/sesion-expirada', sesion.expirada);

    //Usuarios
    app.use('/usuarios', usuariosRouter);
    usuariosRouter.get('/', usuarios.todos);
    usuariosRouter.get('/nuevo', usuarios.nuevo);
    usuariosRouter.post('/guardar', usuarios.guardar);
    //usuariosRouter.post('/editar/:id', usuarios.editar);
    //usuariosRouter.post('/eliminar/:id', usuarios.eliminar);

    //Productos
    app.use('/productos', productosRouter);
    productosRouter.get('/', productos.todos);
    productosRouter.get('/nuevo', productos.nuevo);
    productosRouter.post('/guardar', productos.guardar);
    productosRouter.get('/editar/:id', productos.editar);
    productosRouter.put('/actualizar/:id', productos.actualizar);
    productosRouter.get('/eliminar/:id', productos.eliminar);

    //Ventas
    app.use('/ventas', ventasRouter);
    ventasRouter.get('/', ventas.todas);
    ventasRouter.get('/nueva', ventas.nueva);
    ventasRouter.post('/guardar', ventas.guardar);

    //Clientes
    app.use('/clientes', clientesRouter);
    clientesRouter.get('/', clientes.todos);
    clientesRouter.get('/nuevo', clientes.nuevo);
    clientesRouter.post('/guardar', clientes.guardar);

}