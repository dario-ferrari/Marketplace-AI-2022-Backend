var express = require('express')
var router = express.Router()
var ComentarioController = require('../controllers/comentario.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.post('/create', ComentarioController.createComentario)
router.get('/all', ComentarioController.getComentarios)
router.post('/id',ComentarioController.getComentariosById)
router.put('/update', ComentarioController.updateComentario)
router.delete('/delete',ComentarioController.removeComentario)


// Export the Router
module.exports = router;