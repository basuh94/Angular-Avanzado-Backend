'use strict'
// Modulos
var bcrypt = require('bcrypt-nodejs');

// Modelos
var User = require('../models/user');

// Servicios 
var jwt = require('../services/jwt')

// Acciones
function pruebas(req, res) {

    res.status(200).send({

        message: 'probando el controlador de usuario y la acción pruebas',
        user: req.user
    });

}

function saveUser(req, res) {
    //Creamo un nuevo objeto del usuario
    var user = new User();

    //Recogemos los parametro del body
    var params = req.body;

    if (params.password && params.name) {

        //Asignar valores al objeto usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // findeOne comprobamos si existe el registro que enviamos por POST
        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {

            if (err) {

                res.status(500).send({ message: 'Error al comprobar el usuario' });

            } else {

                if (!issetUser) {

                    //Ciframos la contraseña
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;

                        //Gurdamos ya el usuario en la base de datos
                        user.save((err, userStored) => {
                            if (err) {

                                res.status(500).send({ message: 'Error al guardar el usuario' });

                            } else {

                                if (!userStored) {

                                    res.status(404).send({ message: 'No se ha registrado el usuario' });

                                } else {

                                    res.status(200).send({ user: userStored });

                                }
                            }
                        });
                    });

                } else {

                    res.status(200).send({
                        message: 'El usuario ya se encuentra registrado'

                    });
                }
            }
        });

    } else {

        res.status(200).send({

            message: 'Introduce los datos correctamente para poder registrar al usuario'

        });

    }

}

function login(req, res) {

    var param = req.body;

    var email = param.email;
    var password = param.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {

        if (err) {

            res.status(500).send({ message: 'Error al comprobar el usuario' });

        } else {

            if (user) {

                bcrypt.compare(password, user.password, (err, check) => {

                    if (check) {

                        //Comprobamos y generar token
                        if (param.gettoken) {

                            //Devolvemos el token
                            res.status(200).send({

                                token: jwt.createToken(user)

                            });

                        } else {

                            res.status(200).send({ user });

                        }

                    } else {

                        res.status(404).send({

                            message: 'El usuario no ha podido loguearse'

                        });

                    }

                });

            } else {

                res.status(404).send({

                    message: 'El usuario no ha podido loguearse correctamente'

                })

            }
        }
    });

}

// Exportamos todos los metodos creados.
module.exports = {

    pruebas,
    login,
    saveUser

};