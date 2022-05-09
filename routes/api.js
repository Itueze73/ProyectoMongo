const express = require('express');
const router = express.Router(); 
const {vistaUser, crearUser, vistaUnUser,editarUser,borrarUser, consultaAxios} = require('../controller/controller')
const {check} = require("express-validator");

router.get('/veruser', vistaUser);
router.post('/crearuser',[
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('dni', 'Debe tener un numero Dni').not().isEmpty().isNumeric().isLength({max:8,min:8}),
    check('email', 'Debe tener un email valido').isEmail(),
    check('password').isLength({min: 6})
], crearUser);
router.get('/veruser/:id', vistaUnUser);
router.put('/editaruser/:id', editarUser);
router.delete('/eliminaruser/:id', borrarUser);

router.get('/usuarios', consultaAxios);

module.exports = router;
