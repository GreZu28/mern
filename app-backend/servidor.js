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

async function recibirRegistroPost(req, res) {
    console.log("1) La peticion empieza a ser procesada");
    let nuevoUsuario = new Usuario(req.body);
    console.log(nuevoUsuario);
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

/* Crear Usuario */
rutasAPI.route("/registro").post(recibirRegistroPost);

/* Listar Usuarios */
rutasAPI.route("/").get(async function (req, res) {
    await Usuario.find(function(err,usersCollec) {
        if(err) {
            console.log(err);
        } else {
            res.json(usersCollec);
        }
    });
});

rutasAPI.route("/:id").get(async function(req, res) {
    await Usuario.findById(req.params.id, function(err,user) {
        if(err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

/* Editar Usuario */
rutasAPI.route("/editar/:id").put(async function (req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.nombre
    };
    await Usuario.findByIdAndUpdate(req.params.id, {$set: user});
    console.log(req.params.id);
    /*let us;
    for(const prop in req.body) {
        user[prop] = req.body[prop];
    }
    user.save();*/
    res.json({
        status: 'Empleado modificado'
    });
});

/*rutasAPI.route("/:id").put(function (req, res) {
    let user = new Usuario(req.body);
    user._id = req.params.id;
    console.log(user);
    Usuario.findById(user._id,function(err,us){
        for(const prop in req.body){
            console.log(us[prop])
            us[prop] = req.body[prop]
        }
        us.save()
        console.log("Obj construido " + us);
    }).then(res=>res).catch(err=>err)
    
    res.json({
        status: 'Empleado actualizado'
    });
    console.log(user);
});*/

/* Eliminar Usuario */
rutasAPI.route("/eliminar/:id").delete(async function (req, res) {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Empleado eliminado'
    });
});
