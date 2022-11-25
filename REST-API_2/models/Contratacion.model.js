var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var contratacionSchema = new mongoose.Schema({
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clase'
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    estado: String,
    fechaFinalizacion: Date,
    rating: Number,
    isValorada: Boolean,
    telefono: String,
    email: String,
    horarioRef: Date,
    mensaje: String,
    fechaCreacion: Date
})

contratacionSchema.plugin(mongoosePaginate)
const contratacion = mongoose.model('contratacione', contratacionSchema)

module.exports = contratacion;