var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ComentarioSchema = new mongoose.Schema({
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clase'
    },
    mensaje:String,
    likes:Number,
    estado:String,
    justificacion:Number,
    fechaCreacion:Date
})

ComentarioSchema.plugin(mongoosePaginate)
const Comentario = mongoose.model('comentario', ComentarioSchema)

module.exports = Comentario;