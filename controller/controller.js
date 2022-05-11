const res = require('express/lib/response');
const {User} = require('../models/model');
const {validationResult} = require("express-validator");
const axios = require('axios');
const bcryptjs = require('bcryptjs');

const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
};

const vistaUser = async (req, res) =>{
    try {
        const usuarios = await User.find()
        res.status(201).json({usuarios, msg:'Usuarios registrados'})
    } catch (error) {
        res.status(500).json({msg:'No se puede consultar en este momento', error})
    } 
};

const vistaUnUser = async (req, res) => {
    try {
        const usuarios = await User.findById(req.params.id)
        res.json({usuarios, msg:'Usuario consultado'})
    } catch (error) {
        res.status(500).json({msg:'No se pudo realizar la consulta'})
    }
};

const crearUser = async (req, res)=>{
    
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    const {email, dni, password} = req.body;
    try {
        let usuario = await User.findOne({email, dni})
        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
        usuario = new User(req.body);

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        await usuario.save();

        res.status(200).json({msg:'Usuario registrado con exito'})    
    } catch (error) {
        res.status(400).json({msg:'Existe un error'})
    }
};

const editarUser = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    const {nombre, dni, email, password} = req.body;
    const nuevoUsuario = {};
    if (nombre && dni && email && password)  {
        nuevoUsuario.nombre = nombre,
        nuevoUsuario.dni = dni,
        nuevoUsuario.email = email,
        nuevoUsuario.password = password
    }
    try {
        let usuario = await User.findById(req.params.id);
        if (!usuario) {
             return res.status(404).json({msg:'Usuario no encontrado'})
        }
        const salt = await bcryptjs.genSalt(10);
        nuevoUsuario.password = await bcryptjs.hash(password, salt);

        await usuario.save();
        usuario = await User.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoUsuario}, {new: true});
        res.status(200).json({msg:'Usuario editado'})
    } catch (error) {
        res.status(400).json({msg:'Existe un error', error})
    }
};

const borrarUser = async (req, res) =>{
    try {
        const usuarios = await User.findByIdAndDelete(req.params.id)
        res.status(201).json({msg: "Usuario borrado", usuarios})
    } catch (error) {
        res.status(400).json({msg:'Usuario no encontrado',error})
    }
};

const consultaAxios = async (req, res) =>{
    const resultado = await axios.get("http://localhost:8080/api/veruser", {Timeout: 10000}).catch((error)=>{
        error.origin = 'Error en la direcion URL'
        throw error;
    });
    res.json(resultado.data.usuarios[1])
};

module.exports = {vistaUno, crearUser, vistaUser,vistaUnUser,editarUser,borrarUser,consultaAxios};