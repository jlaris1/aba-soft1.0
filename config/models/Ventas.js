var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// JSON de Ventas
var ventaSchemaJSON = {
    folio: String,
    noTicket: String,
    cliente: String,
    productos: [
        {
            producto: { type: Schema.ObjectId, ref: "Productos"},
            codigo: String,
            nombre: String,
            cantidad: String,
            precioUnitario: String 
        }
    ],
    fecha: String,
    hora: String,
    subtotal: String,
    iva: String,
    total: String,
    pagoCon: String,
    cambio: String
}

// Convertir JSON a Schema Mongoose
var ventaSchema = new Schema(ventaSchemaJSON);

// Crear modelo en MongoDB
mongoose.model("Ventas", ventaSchema);