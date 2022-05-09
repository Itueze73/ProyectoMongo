const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const susuariosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    dni: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uniquie: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
});
const User = mongoose.model('User', susuariosSchema);

module.exports = {User};