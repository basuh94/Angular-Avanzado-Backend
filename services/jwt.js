'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_backend'

exports.createToken = function (user) {
    var payload = {

        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        // En iat le decimos el momento de creación del token
        iat: moment().unix(),
        // En exp le decimos el momento de expiración del token (30 dias)
        exp: moment().add(30, 'days').unix

    };

    return jwt.encode(payload, secret);

};
