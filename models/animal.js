'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema; //Importamos los esquemas de Mongoose

var AnimalSchema = Schema({
    name: String,
    description:String,
    year:Number,
    image:String,
    user: { type: Schema.ObjectId, ref: 'User' } //Este campo le indicamos que se va a relacionar con otros documentos de tipo User
});

module.exports = mongoose.model('Animal', AnimalSchema); //Exportamos el modelo de Animal