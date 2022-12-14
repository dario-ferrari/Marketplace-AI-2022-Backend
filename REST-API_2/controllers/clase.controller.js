const Clase = require('../models/clase.model');
var claseService = require('../services/clase.service');
//var UserImgService =require('../services/userImg.service')

var mongoose = require('mongoose')

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClases = async function (req, res, next) {
    console.log("aca getclases")
    // Check the existence of the query parameters, If doesn't exists assign a default value
    try {
        var Clases = await claseService.getClases({})
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClasesByFilter = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro= req.body
    console.log("query recibida",filtro)
    try {
        var Clases = await claseService.getClases(filtro)
        // Return the Clases list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClasesById = async function(req,res){
    console.log("el back llego hasta aca")
    let filtro= {"_id": mongoose.Types.ObjectId(req.body._id)}
    try {
        var Clases = await claseService.getClaseById(filtro)
        // Return the Clases list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClase = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)    

    var Clase = {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        frecuencia:req.body.frecuencia,
        duracion: req.body.duracion,
        precio: req.body.precio,
        tipo: req.body.tipo,
        rating: req.body.rating,
        Usuarios_id: mongoose.Types.ObjectId(req.body.Usuarios_id),
        comentarios: []
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createClase = await claseService.createClase(Clase)
        return res.status(201).json({createClase, message: "Succesfully Created Clase"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Clase Creation was Unsuccesfull"})
    }
}

exports.updateClase = async function (req, res, next) {

    console.log('Llego la llamada al controlador update')

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "id be present"})
    }

    console.log(req.body.comentarios)
    console.log(req.body.Usuarios_id)
    
    var Clase = {
        _id: mongoose.Types.ObjectId(req.body._id),
        titulo: req.body.titulo ? req.body.titulo : null ,
        imagen: req.body.imagen ? req.body.imagen : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null,
        frecuencia:req.body.frecuencia ?req.body.frecuencia : null ,
        duracion: req.body.duracion ? req.body.duracion :null,
        precio: req.body.precio ? req.body.precio :null,
        tipo: req.body.tipo ? req.body.tipo :null,
        rating: req.body.rating ? req.body.rating :null,
        Usuarios_id: req.body.Usuarios_id ? mongoose.Types.ObjectId(req.body.Usuarios_id._id) :null, 
        comentarios: req.body.comentarios ? req.body.comentarios.map((comment)=>(mongoose.Types.ObjectId(comment._id))) :null,
    }
    console.log("Clase creada para actualizar",Clase)
    try {
        var updateClase = await claseService.updateClase(Clase)
        return res.status(200).json({status: 200, data: updateClase, message: "Succesfully Updated Clase"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClase = async function (req, res, next) {
    console.log("esto es lo que recibe el controller", req.body._id)
    var id = req.body._id

    console.log(id)
    try {
        var deleted = await claseService.deleteClase(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}




exports.guardarImagenClase = async function (req, res) {
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