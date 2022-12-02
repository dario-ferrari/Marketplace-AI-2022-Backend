// Gettign the Newly created Mongoose Model we just created
var Contratacion = require("../models/contratacion.model.js");
var Clase = require("../models/clase.model.js");
var Usuario = require("../models/user.model.js");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Contratacion List
exports.getContrataciones = async function (query) {
  // Options setup for the mongoose paginate
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Query", query);
    var Contrataciones = await Contratacion.find(query)
    .populate([
      {
      path:'clase', 
      model: Clase
    },{
      path:'alumno',
      model:Usuario
    },{
      path:'profesor',
      model:Usuario
    }
  ]);
    // Return the Contrataciond list that was retured by the mongoose promise
    return Contrataciones;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while Paginating Contrataciones");
  }
};

exports.createContratacion = async function (contratacion) {
  // Creating a new Mongoose Object by using the new keyword

  console.log('Aca llegue a crear la contratacion',contratacion)
  var newContratacion = new Contratacion(contratacion)

  try {
    // Saving the Contratacion
    var savedContratacion = await newContratacion.save();
    return savedContratacion._id;
  } catch (e) {
    // return a Error message describing the reason
    console.log(e);
    throw Error("Error while Creating Contratacion");
  }
};

exports.updateContratacion = async function (contratacion) {
  var id = { _id: contratacion._id };

  try {
    //Find the old Contratacion Object by the Id
    var oldContratacion = await Contratacion.findOne(id);
  } catch (e) {
    throw Error("Error occured while Finding the Contratacion");
  }
  // If no old Contratacion Object exists return false
  if (!oldContratacion) {
    return false;
  }
  //Edit the Contratacion Object

  oldContratacion.estado = (oldContratacion.estado!== null) ?  oldContratacion.estado : oldContratacion.estado
  oldContratacion.rating = (oldContratacion.rating!== null) ?  oldContratacion.rating : oldContratacion.rating
  oldContratacion.isValorada = (oldContratacion.isValorada!== null) ?  oldContratacion.isValorada : oldContratacion.isValorada



  console.log('contratacion actualizada', oldContratacion)
  try {
    var savedContratacion = await oldContratacion.save();
    return savedContratacion;
  } catch (e) {
    throw Error("And Error occured while updating the Contratacion");
  }
};

exports.deleteContratacion = async function (id) {
  // Delete the Contratacion
  try {
    var deleted = await Contratacion.remove({
      _id: id,
    });
    if (deleted.n === 0 && deleted.ok === 1) {
      throw Error("Contratacion Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Contratacion");
  }
};
