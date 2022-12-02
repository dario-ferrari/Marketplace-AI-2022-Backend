var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ContratacionSchema = new mongoose.Schema({
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clase'
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    estado: String,
    rating: Number,
    isValorada: Boolean,
    telefono: String,
    email: String,
    horarioRef: Number,
    mensaje: String
})

ContratacionSchema.plugin(mongoosePaginate)
const Contratacion = mongoose.model('contratacione', ContratacionSchema)

module.exports = Contratacion;