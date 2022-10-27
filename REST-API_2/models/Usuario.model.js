var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UsuarioSchema = new mongoose.Schema({
    id:String,
    email: String,
    contrasena: String,
    nombre:String,
    apellido:String,
    telefono:String,
    rol:String,
    fechaNac: String,
    avatar:String,
    contrataciones:Array,
    titulo:String,
    experiencia:String,
    clasesPublicadas:Array,
    clasesNoPublicada:Array,
    estudios:String,
    contratacionesFinalizadas:Array,
    fechaCreacion:Date
})

UserSchema.plugin(mongoosePaginate)
const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario;