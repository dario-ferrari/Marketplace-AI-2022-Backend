var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClaseSchema = new mongoose.Schema({
    id:String,
    titulo: String,
    imagen: String,
    descripcion:String,
    frecuencia:String,
    duracion:Number,
    fechaLimite:Date,
    precio: Number,
    tipo:String,
    rating:Number,
    usuarioId:String,
    disponibilidad:Boolean,
    comentarios:Array,
    fechaCreacion:Date
})

ClaseSchema.plugin(mongoosePaginate)
const Clase = mongoose.model('Clase', ClaseSchema)

module.exports = Clase;