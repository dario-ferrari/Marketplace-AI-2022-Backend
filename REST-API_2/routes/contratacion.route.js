var express = require('express')
var router = express.Router()
var ContratController = require('../controllers/contratacion.controller');



// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */

router.post('/create', ContratController.createContratacion)
router.get('/all', ContratController.getContrataciones)
router.post('/id',ContratController.getContratacionesById)
router.put('/update', ContratController.updateContratacion)
router.delete('/delete',ContratController.removeContratacion )


// Export the Router
module.exports = router;