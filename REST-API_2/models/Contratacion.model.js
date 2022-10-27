var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ContratacionSchema = new mongoose.Schema({
    _id: String,
    Clases_id: String,
    Alumno: Object,
    Profesor: Object,
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

ContratacionSchema.plugin(mongoosePaginate)
const Contratacion = mongoose.model('Contratacione', ContratacionSchema)

module.exports = Contratacion;