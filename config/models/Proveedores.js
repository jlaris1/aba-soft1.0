var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Proveedores
var proveedorSchemaJSON = {
    codigo: String,
    nombre: String,
    correo: String,
    telefono: String,
    fecha: String,
    hora: String
}

// Convertir JSON a Schema Mongoose
var proveedorSchema = new Schema(proveedorSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Proveedores", proveedorSchema);