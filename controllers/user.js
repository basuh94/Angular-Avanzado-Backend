'use strict'
// Modulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require('../models/user');

// Acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'probando el controlador de usuario y la acción pruebas'
    });
}

function saveUser(req, res){
    //Creamo un nuevo objeto del usuario
    var user = new User();

    //Recogemos los parametro del body
    var params = req.body;

    if(params.password && params.name){

        //Asignar valores al objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        //Ciframos la contraseña
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;

            //Gurdamos ya el usuario en la base de datos
            user.save((err, userStored)=>{
                if(err){
                    res.status(500).send({message: 'Error al guardar el usuario'});
                }else{
                    if(!userStored){
                        res.status(404).send({message: 'No se ha registrado el usuario'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                }
            });
        });
    }else{
        res.status(200).send({
            message: 'Introduce los datos correctamente para poder registrar al usuario'
        });
    }

}

// Exportamos
module.exports = {
    pruebas,
    saveUser
};