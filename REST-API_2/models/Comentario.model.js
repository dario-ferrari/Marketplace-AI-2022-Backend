var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ComentarioSchema = new mongoose.Schema({
    Clases_id: mongoose.Schema.Types.ObjectId,
    Usuarios_id: mongoose.Schema.Types.ObjectId,
    mensaje:String,
    likes:Number,
    estado:String,
    justificacion:Number,
    fechaCreacion:Date
})

ComentarioSchema.plugin(mongoosePaginate)
const Comentario = mongoose.model('Comentario', ComentarioSchema)

module.exports = Comentario;