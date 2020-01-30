var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Productos
var usuarioSchemaJSON = {
    nombre: String,
    usuario: String,
    password: String,
    rol: String,
    permisos: String,
    fecha: String,
    hora: String
}

// Convertir JSON a Schema Mongoose
var usuarioSchema = new Schema(usuarioSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Usuarios", usuarioSchema);