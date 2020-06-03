'use strict'

var jwt = require('jwt-simple');
//moment es una libreria para hacer calculos de tiempo lo usamos para la expiración del token
var moment = require('moment');
var secret = 'clave_secreta_backend';

//req(reques), res(respuesta), next(seguir) next() lo usamos para seguir una vez verificado el token
exports.ensureAuth = function (req, res, next) {

    if (!req.headers.authorization) {

        res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticación' });

    }
    // Recogemos el token de la cabecera y la sustituimos la ' y " por vacio para no tener problemas 
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {

        //En payload decodificamos el token para con la clave secreta 
        var payload = jwt.decode(token, secret);

        //Revisiamos si la expiración del token  es menos o igual que la fecha actual
        if (payload.exp <= moment().unix()) {

            return res.status(401).send({
                message: 'El token ha expirado'

            });
        }
    } catch (error) {

        return res.status(404).send({
            message: 'El token no es valido'
        });

    }

    // Una vez verificado que el token es correcto  guardamos en en la reques.user los datos del payload donde tenemos todos los datos del usuario 
    req.user = payload;

    next();
};