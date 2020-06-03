'use strict'

//Exportamos el motor de mongoose 
var mongoose = require('mongoose');
//Exportamos los esquemas de mongoose
var Schema = mongoose.Schema;

//Creamos el esquema de usuario para mongoDB 
var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model('User', UserSchema); 