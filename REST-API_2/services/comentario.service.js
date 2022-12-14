// Gettign the Newly created Mongoose Model we just created
var Comentario = require("../models/comentario.model.js");
var Usuario = require("../models/user.model.js")
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Clase = require("../models/clase.model.js");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Comentario List
exports.getComentarios = async function (query) {
  // Options setup for the mongoose paginate
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Query", query);
    var Comentarios = await Comentario.find(query).populate({
      path: "usuario", 
      model : Usuario
    },{
      path:'clase',
      model: Clase
    });
    // Return the comentariod list that was retured by the mongoose promise
    return Comentarios;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Comentarios");
  }
};

exports.getComentariobyId = async function (query) {
  // Options setup for the mongoose paginate
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Query", query);
    var Comentarios = await Comentario.findOne(query).populate({
      path: "usuario", 
      model : Usuario
    },{
      path:'clase',
      model: Clase
    });
    // Return the comentariod list that was retured by the mongoose promise
    return Comentarios;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Comentarios");
  }
};

exports.createComentario = async function (comentario) {
  // Creating a new Mongoose Object by using the new keyword

  console.log(comentario)

  var newComentario = new Comentario(comentario)

  try {
    // Saving the Comentario
    var savedComentario = await newComentario.save();

    return (savedComentario._id);
  } catch (e) {
    // return a Error message describing the reason
    console.log(e);
    throw Error("Error while Creating Comentario");
  }
};

exports.updateComentario = async function (comentario) {
  var id = { _id: comentario._id };

  try {
    //Find the old Comentario Object by the Id
    var oldComentario = await Comentario.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Comentario");
  }
  // If no old Comentario Object exists return false
  if (!oldComentario) {
    return false;
  }
  //Edit the comentario Object
  oldComentario.estado= comentario.estado;
  oldComentario.justificacion= comentario.justificacion;

  try {
    var savedComentario = await oldComentario.save();
    return savedComentario;
  } catch (e) {
    throw Error("And Error occured while updating the Comentario");
  }
};

exports.deleteComentario = async function (id) {
  // Delete the Comentario
  try {
    var deleted = await Comentario.remove({
      _id: id,
    });
    if (deleted.n === 0 && deleted.ok === 1) {
      throw Error("Comentario Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Comentario");
  }
};
