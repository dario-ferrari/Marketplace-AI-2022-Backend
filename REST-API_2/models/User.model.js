var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    email: String,
    contrasena: String,
    nombre:String,
    apellido:String,
    telefono:String,
    rol:String,
    fechaNac: String,
    avatar:String,
    contrataciones:[],
    titulo:String,
    experiencia:String,
    clasesPublicadas:[],
    clasesNoPublicada:[],
    estudios:String,
    contratacionesFinalizadas:[],
    fechaCreacion:Date
},)

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuario', UserSchema)

module.exports = User;