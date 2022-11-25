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
        ref: 'contratacione'
    }
    ],
    titulo:String,
    experiencia:String,
    clasesPublicadas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clase'
    }],
    clasesNoPublicada:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clase'    
    }],
    estudios:String,
    contratacionesFinalizadas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contratacione'
    }],
    fechaCreacion:Date
},)

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuario', UserSchema)

module.exports = User;