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
    contrataciones:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contrataciones'
    }
    ],
    titulo:String,
    experiencia:String,
    clasesPublicadas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clases'
    }],
    clasesNoPublicada:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clases'
    }],
    estudios:String,
    contratacionesFinalizadas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contrataciones'
    }],
    fechaCreacion:Date
},)

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuario', UserSchema)

module.exports = User;