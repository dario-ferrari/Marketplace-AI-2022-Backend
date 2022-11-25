var express = require('express')
var router = express.Router()
var ComentarioController = require('../controllers/comentario.controller');
var UploadController = require('../controllers/upload.controller');
var MailController = require('../controllers/mail.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.post('/create', ComentarioController.createComentario)
//router.post('/login/', UserController.loginUser)
router.get('/all', ComentarioController.getComentarios)
router.post('/id',ComentarioController.getComentariosById)
router.put('/user', ComentarioController.getComentariosByName)
router.delete('/delete',ComentarioController.removeContratacion)
//router.post('/guardarImgUser',UserController.guardarImagenUser)
//router.post('/uploadImg',UploadController.uploadFilesImgUser);
//router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
//router.post('/sendMail',MailController.sendEmail)

// Export the Router
module.exports = router;