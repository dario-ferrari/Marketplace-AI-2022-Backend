var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ComentarioSchema = new mongoose.Schema({
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clase'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    mensaje:String,
    estado:String,
    justificacion:Number
})

ComentarioSchema.plugin(mongoosePaginate)
const Comentario = mongoose.model('comentario', ComentarioSchema)

module.exports = Comentario;