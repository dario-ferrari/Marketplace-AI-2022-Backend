// Gettign the Newly created Mongoose Model we just created 
var Usuario = require('../models/Usuario.model.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Usuario List
exports.getUsuarios = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Usuarios = await Usuario.paginate(query, options)
        // Return the Usuariod list that was retured by the mongoose promise
        return Usuarios;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Usuarios');
    }
}

exports.createUsuario = async function (usuario) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(usuario.contrasena, 8);
    
    var newUsuario = new Usuario({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        titulo:usuario.titulo,
        experiencia: usuario.experiencia,
        fechaNac: usuario.fechaNac,
        estudios: usuario.estudios,
        date: new Date(),
        contrasena: hashedPassword
    })

    try {
        // Saving the Usuario 
        var savedUsuario = await newUsuario.save();
        var token = jwt.sign({
            id: savedUsuario._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Usuario")
    }
}

exports.updateUsuario = async function (usuario) {
    
    var id = {_id :usuario._id}

    try {
        //Find the old Usuario Object by the Id
        var oldUsuario = await Usuario.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Usuario")
    }
    // If no old Usuario Object exists return false
    if (!oldUsuario) {
        return false;
    }
    //Edit the Usuario Object
    var hashedPassword = bcrypt.hashSync(usuario.contrasena, 8);
    oldUsuario.nombre = usuario.nombre
    oldUsuario.email = usuario.email
    oldUsuario.contrasena = hashedPassword
    oldUsuario.apellido=usuario.apellido
    oldUsuario.telefono=usuario.telefono
    oldUsuario.fechaNac=usuario.fechaNac
    oldUsuario.avatar=usuario.avatar
    oldUsuario.titulo=usuario.titulo
    oldUsuario.experiencia=usuario.experiencia
    oldUsuario.estudios=usuario.estudios
    try {
        var savedUsuario = await oldUsuario.save()
        return savedUsuario;
    } catch (e) {
        throw Error("And Error occured while updating the Usuario");
    }
}

exports.deleteUsuario = async function (id) {

    // Delete the Usuario
    try {
        var deleted = await Usuario.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Usuario Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Usuario")
    }
}


exports.loginUsuario = async function (usuario) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the Usuario 
        console.log("login:",usuario)
        var _details = await Usuario.findOne({
            email: usuario.email
        });
        var passwordIsValid = bcrypt.compareSync(usuario.contrasena, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, usuario:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login Usuario")
    }

}