var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClaseSchema = new mongoose.Schema({
    titulo: String,
    imagen: String,
    descripcion:String,
    frecuencia:String,
    duracion:Number,
    fechaLimite:Date,
    precio: Number,
    tipo:String,
    rating:Number,
    Usuarios_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    }, //profesor
    disponibilidad:Boolean,
    comentarios:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comentario'
        }
    ],
    fechaCreacion:Date
})

ClaseSchema.plugin(mongoosePaginate)
const Clase = mongoose.model('clase', ClaseSchema)

module.exports = Clase;