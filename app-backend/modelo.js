const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO:Validaciones campos BBDD

let Usuario = new Schema({
    email:{
        type: String
    },
    password:{
        type: String
    },
    nombre:{
        type: String
    }
});

module.exports = mongoose.model('Usuario',Usuario);