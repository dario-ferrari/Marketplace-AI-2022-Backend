// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/user.model.js');
var Contratacione = require('../models/contratacion.model.js');
var Clase = require('../models/clase.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.find(query)
        // Return the User list that was retured by the mongoose promise
        console.log(Users)
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

// Async function to get the specific User by id
exports.getUserbyId = async function (query) {

    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.findOne(query).populate([
            {path:'contrataciones', model: Contratacione ,populate: {path:'clase', model: Clase }},{path:'clasesPublicadas', model: Clase}])
        // Return the User list that was retured by the mongoose promise
        console.log("respuesta",Users)
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users', e);
    }
}


exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.contrasena, 8);
    
    var newUser = new User({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        titulo:user.titulo,
        experiencia: user.experiencia,
        fechaNac: user.fechaNac,
        estudios: user.estudios,
        date: new Date(),
        contrasena: hashedPassword
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    
    var id = {_id :user._id}

    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    oldUser.nombre = (user.nombre!== null) ?  user.nombre : oldUser.nombre
    oldUser.email = (user.email!== null) ?  user.email : oldUser.email
    oldUser.contrasena = (user.contrasena!== null) ?  user.contrasena : oldUser.contrasena
    oldUser.apellido = (user.apellido!== null) ?  user.apellido : oldUser.apellido
    oldUser.telefono = (user.telefono!== null) ?  user.telefono : oldUser.telefono
    oldUser.avatar = (user.avatar!== null) ?  user.avatar : oldUser.avatar
    oldUser.titulo = (user.titulo!== null) ?  user.titulo : oldUser.titulo
    oldUser.experiencia = (user.experiencia!== null) ?  user.experiencia : oldUser.experiencia
    oldUser.estudios = (user.estudios!== null) ?  user.estudios : oldUser.estudios
    oldUser.contrataciones = (user.contrataciones!== null) ?  user.contrataciones : oldUser.contrataciones
    oldUser.clasesPublicadas = (user.clasesPublicadas!== null) ?  user.clasesPublicadas : oldUser.clasesPublicadas

    console.log('usuario actualizado', oldUser)
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        //var passwordIsValid = bcrypt.compareSync(user.contrasena, _details.password);
        console.log(_details.contrasena)
        console.log(user.pass)
        var passwordIsValid = (_details.contrasena == user.pass) ? true : false;
        console.log(passwordIsValid)
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}