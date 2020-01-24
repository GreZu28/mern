const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO:Validaciones campos BBDD

let Usuario = new Schema({
    nombre:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
});

module.exports = mongoose.model('Usuario',Usuario);