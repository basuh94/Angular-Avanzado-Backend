'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas
var user_routes = require('./routes/user');

//Middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false})); //Configuracion necesaria de body-parser
app.use(bodyParser.json());


//Configurar cabeceras y cors

// Rutas boy-parser
app.use('/api', user_routes);


module.exports = app; 