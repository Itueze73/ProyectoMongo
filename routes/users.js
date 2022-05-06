const express = require('express');
const router = express.Router();
const {crearUser, vistaUser,vistaUnUser,editarUser,borrarUser,consultaAxios} = require('../controller/controller.js');
const {check,validationResult, body} = require("express-validator");

router.get('/veruser', vistaUser);
router.get('/veruser/:id', vistaUnUser);
router.post('crearuser',[
    check("nombre").not().isEmpty().withMessage("Debe tener un nombre"),
    check("dni").not().isEmpty().isNumeric().isLength({max:8,min:8}).withMessage("Debe tener un nombre"),
    check("email").not().isEmpty().withMessage("Debe tener un nombre"),
    check("password").isLatLong({min:6}).withMessage("Debe tener un nombre"),
], crearUser);
router.put('/editaruser/:id', editarUser);
router.delete('/eliminaruser/:id', borrarUser);
router.get('/usuarios', consultaAxios);