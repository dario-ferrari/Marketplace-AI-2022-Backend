const Contratacion = require('../models/contratacion.model');
var contratacionService = require('../services/contratacion.service');
//var UserImgService =require('../services/userImg.service');

var mongoose = require('mongoose')
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getContrataciones = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Contrataciones = await contratacionService.getContrataciones({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contrataciones, message: "Succesfully Contrataciones Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getContratacionesByClase = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {clase: mongoose.Types.ObjectId(req.body.clase)}
    try {
        var Contrataciones = await contratacionService.getContrataciones(filtro)
        // Return the Contrataciones list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contrataciones, message: "Succesfully Contrataciones Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getContratacionesById = async function(req,res){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {_id: mongoose.Types.ObjectId(req.body._id)}
    try {
        var Contrataciones = await contratacionService.getContrataciones(filtro, page, limit)
        // Return the Contrataciones list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Contrataciones, message: "Succesfully Contrataciones Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createContratacion = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Contratacion = {

        clase: mongoose.Types.ObjectId(req.body.clase),
        alumno:  mongoose.Types.ObjectId(req.body.alumno),
        profesor: mongoose.Types.ObjectId(req.body.profesor),
        estado: req.body.estado,
        rating: req.body.rating,
        isValorada: req.body.isValorada,
        telefono: req.body.telefono,
        email: req.body.email,
        horarioRef: req.body.horarioRef,
        mensaje: req.body.mensaje

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createContratacion = await contratacionService.createContratacion(Contratacion)
        return res.status(201).json({createContratacion, message: "Succesfully Created Contratacion"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Contratacion Creation was Unsuccesfull"})
    }
}

exports.updateContratacion = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Contratacion = {
        _id: mongoose.Types.ObjectId(req.body._id),
        estado: req.body.estado ? req.body.estado : null,
        rating: req.body.rating ? req.body.rating : null,
        isValorada: req.body.isValorada ? req.body.isValorada : null,
    }
    try {
        var updateContratacion = await contratacionService.updateContratacion(Contratacion)
        return res.status(200).json({status: 200, data: updateContratacion, message: "Succesfully Updated Contratacion"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeContratacion = async function (req, res, next) {

    var id = mongoose.Types.ObjectId(req.params._id);
    try {
        var deleted = await contratacionService.deleteContratacion(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}




exports.guardarImagenContratacion = async function (req, res) {

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