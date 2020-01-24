const express = require('express');
const bodyParser = require('body-parser');

//TODO: IMPORTAR Y USAR MIDDLEWARE CORS
const cors = require('cors');
const mongoose = require('mongoose');
const Usuario = require('./modelo');

const app = express();
const port = 4000;

//Serializacion y Deserializacion
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/db_usuarios');

const conexion = mongoose.connection;

conexion.once("open",()=>console.log('Conectado'));

app.listen(port,()=>console.log('Servidor ejecutando el el puerto ' + port));

const rutasAPI = express.Router();

app.use("/api/usuarios",rutasAPI);

function recibirRegistroPost(req, res) {
    console.log("1) La peticion empieza a ser procesada");
    let nuevoUsuario = new Usuario(req.body);
    let promesaDeGuardado = nuevoUsuario.save();
    promesaDeGuardado.then( usuario => {
        console.log("4) Se ha registrado en BBDD");
        res.status(200).json({
            "usuario":"Creado satisfactoriamente"
        })
    });
    promesaDeGuardado.catch( error =>{
        console.log("4) Ha Fallado");
        res.status(400).send("Ha fallado");
    });
    console.log('3) Peticion procesada');
}

rutasAPI.route("/registro").post(recibirRegistroPost);

rutasAPI.route("/").get(function (req, res) {
    Usuario.find(function(err,usersCollec) {
        if(err) {
            console.log(err);
        } else {
            res.json(usersCollec);
        }
    });
});

/**
 * rutasAPI.route.("/update/:id").put
 */

//rutasAPI.route("/update/:id").put() {}

 /**
 * rutasAPI.route
 */

