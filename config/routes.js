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

    // SERVICIOS
    var servicios = require('../routes/servicios');
    var serviciosRouter = express.Router();

    // TIPOS DE SERVICIOS
    var tiposServicios = require('../routes/tiposServicios');
    var tiposServiciosRouter = express.Router();

    // VENTAS
    var ventas = require('../routes/ventas');
    var ventasRouter = express.Router();


    // CLIENTES
    var clientes = require('../routes/clientes');
    var clientesRouter = express.Router();

    // CAJAS
    var cajas = require('../routes/cajas');
    var cajasRouter = express.Router();

    // INVENTARIOS
    var inventarios = require('../routes/inventarios');
    var inventariosRouter = express.Router();

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

    //Cajas
    app.use('/caja', cajasRouter);
    cajasRouter.get('/', cajas.todos);
    cajasRouter.get('/nueva', cajas.nuevo);
    cajasRouter.get('/apertura', cajas.apertura);
    cajasRouter.get('/corte', cajas.corte);
    cajasRouter.post('/nueva/guardar', cajas.guardar);
    cajasRouter.post('/abrir', cajas.abrir);
    cajasRouter.post('/corte/realizar', cajas.guardarCorte);

    //Productos
    app.use('/productos', productosRouter);
    productosRouter.get('/', productos.todos);
    productosRouter.get('/nuevo', productos.nuevo);
    productosRouter.post('/guardar', productos.guardar);
    productosRouter.get('/editar/:id', productos.editar);
    productosRouter.put('/actualizar/:id', productos.actualizar);
    productosRouter.get('/eliminar/:id', productos.eliminar);

     //Servicios
     app.use('/servicios', serviciosRouter);
     serviciosRouter.get('/', servicios.todos);
     serviciosRouter.get('/nuevo', servicios.nuevo);
     serviciosRouter.post('/guardar', servicios.guardar);
     serviciosRouter.get('/editar/:id', servicios.editar);
     serviciosRouter.put('/actualizar/:id', servicios.actualizar);
     serviciosRouter.get('/eliminar/:id', servicios.eliminar);

     //tipos de Servicios
     app.use('/tiposServicios', tiposServiciosRouter);
     tiposServiciosRouter.get('/', tiposServicios.todos);
     tiposServiciosRouter.get('/nuevo', tiposServicios.nuevo);
     tiposServiciosRouter.post('/guardar', tiposServicios.guardar);
     tiposServiciosRouter.get('/editar/:id', tiposServicios.editar);
     tiposServiciosRouter.put('/actualizar/:id', tiposServicios.actualizar);
     tiposServiciosRouter.get('/eliminar/:id', tiposServicios.eliminar);


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

    //tipos de Servicios
    app.use('/inventarios', inventariosRouter);
    inventariosRouter.get('/', inventarios.todos);
    inventariosRouter.get('/nuevo', inventarios.nuevo);
    inventariosRouter.post('/guardar', inventarios.guardar);
    inventariosRouter.get('/editar/:id', inventarios.editar);
    inventariosRouter.put('/actualizar/:id', inventarios.actualizar);
    inventariosRouter.get('/eliminar/:id', inventarios.eliminar);

}