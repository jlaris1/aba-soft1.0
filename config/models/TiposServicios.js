var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Servicios
var tipoServicioSchemaJSON = {
    codigo: String,
    nombre: String,
    descripcion: String
}

// Convertir JSON a Schema Mongoose
var tipoServicioSchema = new Schema(tipoServicioSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("TiposServicios", tipoServicioSchema);