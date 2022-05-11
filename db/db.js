
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {  
        await mongoose.connect( process.env.MONGO_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )
        console.log('Conectado a la base de datos de Itu');
    } catch (error) {
        console.log(error);
        throw new Error('No se puede conectar en este momento')   
    }
}

module.exports = {dbConnection}

