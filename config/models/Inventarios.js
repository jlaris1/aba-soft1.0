var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Servicios
var inventarioSchemaJSON = {
    tipo: String,
    descripcion: String,
    stock: Number,
    entradas: Number,
    productoServicioId: { type: Schema.ObjectId, ref: "Productos"} 
}

// Convertir JSON a Schema Mongoose
var inventarioSchema = new Schema(inventarioSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Inventarios", inventarioSchema);