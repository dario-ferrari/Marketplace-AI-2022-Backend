const Comentario = require('../models/comentario.model');
var comentarioService = require('../services/comentario.service');
//var UserImgService =require('../services/userImg.service');

var mongoose = require('mongoose')
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getComentarios = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    try {
        var Comentarios = await comentarioService.getComentarios({})
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Comentarios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getComentariosByName = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro= {titulo: req.body.titulo}
    try {
        var Comentarios = await comentarioService.getComentarios(filtro)
        // Return the Comentarios list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Comentarios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getComentariosById = async function(req,res){

    let filtro= {_id: mongoose.Types.ObjectId(req.body._id)}
    try {
        var Comentarios = await comentarioService.getComentariobyId(filtro)
        // Return the Comentarios list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Comentarios Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createComentario = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Comentario = {
        clase: req.body.clase,
        usuario: req.body.usuario,
        mensaje: req.body.mensaje,
        likes: req.body.likes,
        estado: req.body.estado,
        justificacion: req.body.justificacion
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createComentario = await comentarioService.createComentario(Comentario)
        return res.status(201).json({createComentario, message: "Succesfully Created Comentario"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Comentario Creation was Unsuccesfull"})
    }
}

exports.updateComentario = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Comentario = {
        _id: mongoose.Types.ObjectId(req.body._id),
        clase: mongoose.Types.ObjectId(req.body.clase) ? mongoose.Types.ObjectId(req.body.clase) :null, 
        usuario: mongoose.Types.ObjectId(req.body.usuario) ? mongoose.Types.ObjectId(req.body.usuario) :null, 
        mensaje: req.body.mensaje ? req.body.mensaje: null ,
        likes: req.body.likes ? req.body.likes: null ,
        estado: req.body.estado ? req.body.estado: null ,
        justificacion: req.body.justificacion ? req.body.justificacion: null

    }
    try {
        var updateComentario = await comentarioService.updateComentario(Comentario)
        return res.status(200).json({status: 200, data: updateComentario, message: "Succesfully Updated Comentario"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeComentario = async function (req, res, next) {

    var id = mongoose.Types.ObjectId(req.params._id);
    try {
        var deleted = await comentarioService.deleteComentario(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}




exports.guardarImagenComentario = async function (req, res) {

    console.log("ImgUser",req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Mail must be present"})
    }

    let userImg = {
        email: req.body.email,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (userImg.nombreImagen!=='')
        {
            var newUserImg = await UserImgService.createUserImg(userImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getImagenUserByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var UsersImg = await UserImgService.getImagenesByUser(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log("userByDni",UsersImg)
        if (UsersImg.total===0)
            return res.status(201).json({status: 201, data: UsersImg, message: "No existe Mail"});
        else
            return res.status(200).json({status: 200, data: UsersImg, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}