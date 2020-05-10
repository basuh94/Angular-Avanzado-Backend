'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas

//Middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false})); //Configuracion necesaria de body-parser
app.use(bodyParser.json());


//Configurar cabeceras y cors

// Rutas boy-parser
app.get('/probando', (req, res)=>{
    res.status(200).send({message: 'Este es el metodo probando'});
});

module.exports = app; 