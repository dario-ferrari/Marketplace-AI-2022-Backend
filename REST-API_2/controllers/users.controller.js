var UsuarioService = require('../services/user.service');
var UserImgService =require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Usuarios = await UsuarioService.getUsuarios({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Usuarios, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUsersByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    try {
        var Usuarios = await UsuarioService.getUsuarios(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Usuarios, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getyUsersById = async function(req,res){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {_id: req.body._id}
    try {
        var Usuarios = await UsuarioService.getUsuarios(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Usuarios, message: "Succesfully Users Recieved"});
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
        var createdUser = await UsuarioService.createUser(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var User = {
       
        nombre: req.body.nombre ? req.body.nombre :null,
        apellido: req.body.apellido ? req.body.apellido :null,
        email: req.body.email ? req.body.email :null,
        titulo:req.body.titulo ? req.body.titulo :null,
        experiencia: req.body.experiencia ? req.body.experiencia :null,
        fechaNac: req.body.fechaNac ? req.body.fechaNac :null,
        estudios: req.body.estudios ? req.body.estudios :null,
        date: req.body.date ? req.body.date :null,
        contrasena: req.body.contrasena ? req.body.contrasena :null,
    }
    try {
        var updatedUser = await UsuarioService.updateUsuario(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.params._id;
    try {
        var deleted = await UsuarioService.deleteUsuario(id);
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
        contrasena: req.body.contrasena
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UsuarioService.loginUsuario(User);
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
    
    
