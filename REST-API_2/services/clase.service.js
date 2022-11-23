// Gettign the Newly created Mongoose Model we just created hola como estas
var Clase = require("../models/Clase.model.js");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Clase List
exports.getClases = async function (query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit,
  };
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Esta es la query de buscar por id Query", query);
    var Clases = await Clase.find(query);
    // Return the C lased list that was retured by the mongoose promise
    return Clases;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Clases");
  }
};

exports.getClaseById = async function (query, page, limit) {
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Esta es la query de buscar por id clase", query);
    var Clases = await Clase.findOne(query);
    // Return the C lased list that was retured by the mongoose promise
    return Clases;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Clases");
  }
};

exports.createClase = async function (clase) {
  // Creating a new Mongoose Object by using the new keyword
  console.log(clase.Usuarios_id)
  var newClase = new Clase(clase)

  try {
    // Saving the Clase
    var savedClase = await newClase.save();
    var token = jwt.sign(
      {
        id: savedClase._id,
      },
      process.env.SECRET,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );
    return token;
  } catch (e) {
    // return a Error message describing the reason
    console.log(e);
    throw Error("Error while Creating Clase");
  }
};

exports.updateClase = async function (clase) {
  var id = { _id: clase._id };

  try {
    //Find the old Clase Object by the Id
    var oldClase = await Clase.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Clase");
  }
  // If no old Clase Object exists return false
  if (!oldClase) {
    return false;
  }
  //Edit the Clase Object
  oldClase.titulo = clase.titulo;
  oldClase.imagen = clase.imagen;
  oldClase.descripcion = clase.descripcion;
  oldClase.frecuencia = clase.frecuencia;
  oldClase.duracion = clase.duracion;
  oldClase.fechaLimite = clase.fechaLimite;
  oldClase.precio = clase.precio;
  oldClase.tipo = clase.tipo;
  oldClase.rating = clase.rating;
  oldClase.disponibilidad = clase.disponibilidad;
  oldClase.comentarios = clase.comentarios;
  try {
    var savedClase = await oldClase.save();
    return savedClase;
  } catch (e) {
    throw Error("And Error occured while updating the Clase");
  }
};

exports.deleteClase = async function (id) {
  // Delete the Clase
  console.log(id)
  try {
    var deleted = await Clase.deleteOne({
      _id: id,
    });
    if (deleted.n === 0 && deleted.ok === 1) {
      throw Error("Clase Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Clase");
  }
};
