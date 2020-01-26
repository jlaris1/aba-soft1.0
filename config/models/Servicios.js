var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Servicios
var servicioSchemaJSON = {
    codigo: String,
    descripcion: String,
    costo: String,
    utilidad: String,
    pUtilidad: String,
    pVenta: String,
    fecha: String,
    hora: String
    // tipoServicio: 
}

// Convertir JSON a Schema Mongoose
var servicioSchema = new Schema(servicioSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Servicios", servicioSchema);