const mongoose = require('mongoose');

const usuariosSchema =  mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    dni: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('User', usuariosSchema)