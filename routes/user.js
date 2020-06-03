'use strict'
var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

//Con md_auth.ensureAuth aseguramos la URL con el token para verificar que el usuario está logueado
api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);

api.post('/register', UserController.saveUser);

api.post('/login', UserController.login);

module.exports = api;