'use strict' //Con esto le indicamos que puede usar nuevas instrucciones de los nuevos estandares de JavaScript

var mongoose =  require('mongoose');
var app  = require('./app');
var port = process.env.PORT || 3789;

//Creamos la conexión con la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/ZOO', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{

        console.log('La conexion a la base de datos ZOO se ha realizado correctamente...');
        
        app.listen(port,()=>{
            console.log("El servidor local con Node y Express está corriendo");
        });
    })
    .catch(err => console.log(err));

