var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Caja
var cajaSchemaJSON = {
    codigo: String,
    nombre: String,
    fecha: Date,
    hora: String
}

var aperturaCajaSchemaJSON = {
    caja: { type: Schema.ObjectId, ref: "Cajas"},
    cajero: { type: Schema.ObjectId, ref: "Usuarios"},
    montoInicial: String,
    fecha: Date,
}

var corteCajaSchemaJSON = {
    caja: { type: Schema.ObjectId, ref: "Cajas"},
    cajero: { type: Schema.ObjectId, ref: "Usuarios"},
    montoInicial: String,
    montoFinal: String,
    horaEntrada: String,
    horaSalida: String
}

// Convertir JSON a Schema Mongoose
var cajasSchema = new Schema(cajaSchemaJSON);
var aperturaCajaSchema = new Schema(aperturaCajaSchemaJSON);
var corteCajaSchema = new Schema(corteCajaSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Cajas", cajasSchema);
mongoose.model("AperturaCajas", aperturaCajaSchema);
mongoose.model("CorteCajas", corteCajaSchema);