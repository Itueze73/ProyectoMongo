const express = require('express');
const router = express.Router();
const {vistaUno} = require('../controller/controller.js')

/* GET home page. */
router.get('/', vistaUno);

module.exports = router;
