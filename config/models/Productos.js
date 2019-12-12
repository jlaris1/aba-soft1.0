var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Productos
var productoSchemaJSON = {
    codigo: String,
    descripcion: String,
    unidad: String,
    costo: String,
    utilidad: String,
    pUtilidad: String,
    pVenta: String,
    existencia: String,
    minimo: String,
    maximo: String,
    fecha: String,
    hora: String
}

// Convertir JSON a Schema Mongoose
var productoSchema = new Schema(productoSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Productos", productoSchema);