var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Clientes
var clienteSchemaJSON = {
    codigo: String,
    nombre: String,
    identificacion: String,
    noIdentificacion: String,
    limiteCredito: String,
    saldo: String,
    fecha: String,
    hora: String
}

// Convertir JSON a Schema Mongoose
var clienteSchema = new Schema(clienteSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Clientes", clienteSchema);