const res = require('express/lib/response');
const User = require('../models/model');
const {validationResult} = require("express-validator");
const axios = require('axios');
const bcryptjs = require('bcryptjs');

const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
}

const vistaUser = async (req, res) =>{
    try {
        const usuarios = await User.find()
        res.status(201).json({usuarios, msg:'Usuarios registrados'})
    } catch (error) {
        res.status(400).json({msg:'No se puede consultar en ste momento', error})
    } 
}

const vistaUnUser = async (req, res) => {
    try {
        const usuarios = await User.findById(req.params.id)
        res.json({usuarios, msg:'Usuario consultado'})
    } catch (error) {
        res.status(400).json({msg:'No se pudo realizar la consulta'})
    }
}

const crearUser = async (req, res)=>{
    const {nombre, dni, email, password} = req.body;
    try {
        if(!email){
            return res.status(400).josn({msg:'El email es obligatorio'})
        };
        if(email || nombre || dni){
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({error: error.array()});
            };
        }else {
            return res.status(400).json({msg:'El solo puede ser creado pasando todos sus datos'})
        };
        let newUsuario = await User.findOne({email});
        if(newUsuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
        newUsuario = new User(req.body);

        const salt = await bcryptjs.genSalt(10);

        newUsuario.password = await bcryptjs.hash(password, salt);
        await newUsuario.save();
        res.status(201).json({msg:'Se ha creado un nuevo usuario'});
    } catch(error){
        console.log(error)
        res.status(400).send({msg:'Hubo un error al crear el usuario', error});
    };
};

const editarUser = async (req, res) => {
    const { _id, nombre, dni, email, password } = req.body;

    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
    
    let editarUsuario;

    try {
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        };
        
        if ( _id || nombre || dni || email || password) {
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array()});
            };    
        } else {
            return res.status(400).json({ msg: 'El usuario solo puede ser modificado pasando todos sus datos'});
        };
        
        const salt = await bcryptjs.genSalt(10);
        const mypassword = await bcryptjs.hash(password, salt );

        editarUsuario = req.body;
        editarUsuario={
                        _id: valorClave,
                        nombre: nombre,
                        dni: dni,
                        email:email,
                        password: mypassword
                        };  
        
        const usuario = await User.findByIdAndUpdate( valorClave, editarUsuario );

        res.status(200).json({msg:'Usuario editado', editarUsuario}); 

    } catch (error) {
        res.status(400).send({msg: 'Hubo un error al buscar el usuario, o el usuario no se encuentro en la base',error});      
    };
}

const borrarUser = async (req, res) =>{
    try {
        const usuarios = await User.findByIdAndDelete(req.params.id)
        res.status(201).json({msg: "Usuario borrado", usuarios})
    } catch (error) {
        res.status(400).json({msg:'Usuario no encontrado',error})
    }
}

const consultaAxios = async (req, res) =>{
    const resultado = await axios.get("http://localhost:8080/api/veruser", {Timeout: 10000}).catch((error)=>{
        error.origin = 'Error en la direcion URL'
        throw error;
    });
    res.json(resultado.data.usuarios[0])
}

module.exports = {vistaUno, crearUser, vistaUser,vistaUnUser,editarUser,borrarUser,consultaAxios}