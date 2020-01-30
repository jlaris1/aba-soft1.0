var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Servicios
var inventarioSchemaJSON = {
    tipo: String,
    descripcion: String,
    stock: String,
    entradas: String,
    productoServicioId: { type: Schema.ObjectId, ref: "Productos"} 
}

// Convertir JSON a Schema Mongoose
var inventarioSchema = new Schema(inventarioSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Inventarios", inventarioSchema);