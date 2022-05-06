const express = require('express');
const router = express.Router(); 
const {vistaUser, crearUser, vistaUnUser,editarUser,borrarUser, consultaAxios} = require('../controller/controller.js')

/* GET users listing. */
router.get('/veruser', vistaUser);
router.post('/crearuser', crearUser);
router.get('/veruser/:id', vistaUnUser);
router.put('/editaruser/:id', editarUser);
router.delete('/eliminaruser/:id', borrarUser);

router.get('/usuarios', consultaAxios);

module.exports = router;
