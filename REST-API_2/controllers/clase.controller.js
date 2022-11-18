const Clase = require('../models/Clase.model');
var claseService = require('../services/clase.service');
//var UserImgService =require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClases = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Clases = await claseService.getClases({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClasesByName = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {titulo: req.body.titulo}
    try {
        var Clases = await claseService.getClases(filtro, page, limit)
        // Return the Clases list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClasesById = async function(req,res){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {_id: req.body._id}
    try {
        var Clases = await claseService.getClases(filtro, page, limit)
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
        fechaLimite: req.body.fechaLimite,
        precio: req.body.precio,
        tipo: req.body.tipo,
        rating: req.body.rating,
        Usuarios_id: req.body.Usuarios_id,
        disponibilidad: req.body.disponibilidad,
        comentarios: req.body.comentarios,
        fechaCreacion: req.body.fechaCreacion
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

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Clase = {
       
        titulo: req.body.titulo ? req.body.titulo : null ,
        imagen: req.body.imagen ? req.body.imagen : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null,
        frecuencia:req.body.frecuencia ?req.body.frecuencia : null ,
        duracion: req.body.duracion ? req.body.duracion :null,
        fechaLimite: req.body.fechaLimite ? req.body.fechaLimite :null,
        precio: req.body.precio ? req.body.precio :null,
        tipo: req.body.tipo ? req.body.tipo :null,
        rating: req.body.rating ? req.body.rating :null,
        Usuarios_id: req.body.Usuarios_id ? req.body.Usuarios_id :null,
        disponibilidad: req.body.disponibilidad ? req.body.disponibilidad :null,
        comentarios: req.body.comentarios ? req.body.comentarios :null,
        fechaCreacion: req.body.fechaCreacion ? req.body.fechaCreacion :null
    }
    try {
        var updateClase = await claseService.updateClase(Clase)
        return res.status(200).json({status: 200, data: updateClase, message: "Succesfully Updated Clase"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeClase = async function (req, res, next) {

    var id = req.params._id;
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