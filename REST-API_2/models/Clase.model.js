var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClaseSchema = new mongoose.Schema({
    titulo: String,
    imagen: String,
    descripcion:String,
    frecuencia:String,
    duracion:Number,
    precio: Number,
    tipo:String,
    rating:Number,
    Usuarios_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    }, //profesor
    comentarios:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comentario'
        }
    ]
})

ClaseSchema.plugin(mongoosePaginate)
const Clase = mongoose.model('clase', ClaseSchema)

module.exports = Clase;