var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var contratacionSchema = new mongoose.Schema({
    Clases_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clases'
    },
    alumno: Object,
    profesor: Object,
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