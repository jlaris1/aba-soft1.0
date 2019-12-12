// variables para funcionalidad del servidor Node JS + Express JS
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	cloudinary = require('cloudinary'),
	method_override  = require('method-override'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	fileUpload = require('express-fileupload'),
	port = 3000,
	app = express();
	compression = require('compression');
	fs = require('fs');
	path = require('path');
	
require('mongoose-double')(mongoose);

// Eliminar mensaje deprecation warning
mongoose.Promise = global.Promise;

const dbConCloud = "mongodb://db_user:%40db_user911@affatest-shard-00-00-ee6re.gcp.mongodb.net:27017,affatest-shard-00-01-ee6re.gcp.mongodb.net:27017,affatest-shard-00-02-ee6re.gcp.mongodb.net:27017/affatest?ssl=true&replicaSet=affaTest-shard-0&authSource=admin&retryWrites=true"
const dbConLocal = "mongodb://localhost:27017/llaosserv";

// Producción
//mongoose.connect(dbConCloud,  { useNewUrlParser: true , useUnifiedTopology: true});

mongoose
.connect(dbConCloud, {
	//useUnifiedTopology: true,
	useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
	console.log('DB Connection Error:' + err); 
	//console.log('DB Connection Error:' `${err.message}`);
});

// Indicar a express que el motor visual será JADE/PUG
app.set("view engine","pug");

// Usos de expresss, utilizar bodyparser y carpetas publicas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
	secret: "123byuhbsdah12ub",
    resave: false,
    saveUninitialized: true
}));
app.use(method_override("_method"));
app.use(express.static("public"));
app.use(express.static('files'));
app.use(fileUpload());
app.use(compression());
app.locals._      = require('underscore');
app.locals._.str  = require('underscore.string');
app.locals.moment = require('moment');


/* Importaciones de modelos */
require('./config/models/Usuarios');
require('./config/models/Clientes');
require('./config/models/Productos');
require('./config/models/Proveedores');
require('./config/models/Ventas');


/* Importación de clase que contiene todas las rutas */
require('./config/routes')(app);

// Indicar a express en que puerto estará escuchando
app.listen(port);