var express = require('express')
var router = express.Router()
var ClaseController = require('../controllers/clase.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.post('/createClase', ClaseController.createClase)
//router.post('/login/', UserController.loginUser)
router.get('/all', ClaseController.getClases)
router.post('/clasesByName/:titulo',ClaseController.getClasesByName)
router.put('/', ClaseController.updateClase)
router.delete('/deleteClase/:id',ClaseController.removeClase )
//router.post('/guardarImgUser',UserController.guardarImagenUser)
//router.post('/uploadImg',UploadController.uploadFilesImgUser);
//router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
//router.post('/sendMail',MailController.sendEmail)

// Export the Router
module.exports = router;