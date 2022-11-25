var UserService = require('../services/user.service');
var UserImgService =require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUsersByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    console.log("el email que recibo",req.body.email)
    let filtro= {email: req.body.email}
    console.log('fior;trioatjfklg',filtro)
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log(Users)
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUsersById = async function(req,res){

    console.log("aca estoy llegando salame")
    let filtro= {_id: req.body._id}
    try {
        var Users = await UserService.getUserbyId(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        titulo:req.body.titulo,
        experiencia: req.body.experiencia,
        fechaNac: req.body.fechaNac,
        estudios: req.body.estudios,
        date: req.body.date,
        contrasena: req.body.contrasena
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function (req, res, next) {

    console.log('aca llega el actualizar usuario',req.body)

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var User = {
        _id: req.body._id,
        nombre: req.body.nombre ? req.body.nombre :null,
        apellido: req.body.apellido ? req.body.apellido :null,
        email: req.body.email ? req.body.email :null,
        titulo:req.body.titulo ? req.body.titulo :null,
        experiencia: req.body.experiencia ? req.body.experiencia :null,
        avatar : req.body.avatar ? req.body.avatar :null,
        fechaNac: req.body.fechaNac ? req.body.fechaNac :null,
        estudios: req.body.estudios ? req.body.estudios :null,
        date: req.body.date ? req.body.date :null,
        contrasena: req.body.contrasena ? req.body.contrasena :null,
        contrataciones: req.body.contrataciones ? req.body.contrataciones.map((contrat)=>(mongoose.Types.ObjectId(contrat))) :null,
        clasesPublicadas: req.body.clasesPublicadas ? req.body.clasesPublicadas.map((clasePub)=>(mongoose.Types.ObjectId(clasePub))) :null
    }
    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.params._id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginUser = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        pass: req.body.pass
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        if (loginUser===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.guardarImagenUser = async function (req, res) {

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
    
    
