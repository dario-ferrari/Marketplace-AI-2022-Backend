var express = require('express')
var router = express.Router()
var ContratacionController = require('../controllers/contratacion.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.post('/create', ContratacionController.createContratacion)
//router.post('/login/', UserController.loginUser)
router.get('/all', ContratacionController.getContrataciones)
router.post('/id',ContratacionController.getContratacionesById)
router.put('/update', ContratacionController.updateContratacion)
router.delete('/delete',ContratacionController.removeContratacion )
//router.post('/guardarImgUser',UserController.guardarImagenUser)
//router.post('/uploadImg',UploadController.uploadFilesImgUser);
//router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
//router.post('/sendMail',MailController.sendEmail)

// Export the Router
module.exports = router;