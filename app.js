var express = require('express'),
     path = require('path'),
     mysql= require('mysql'),
     bodyParser = require('body-parser');
 
 var app = express();
 app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 // Establecer la ruta de las vistas
 app.set('views', path.join(__dirname, 'views'));
 
 // Motor de las vistas, que podría ser Jade, Mustache. Pero en la práctica vamos
 // A usar EJS (EmbeddedJS)
 app.set('view engine', 'ejs');
 
 
 // Guardamos las rutas que nos proporciona index en index
 const index = require('./routes/index'),
       usuario = require('./routes/usuario'),
       login = require('./routes/login');
 
 // Capturamos la variable de entorno NODE_ENV
 var env = process.env.NODE_ENV || 'development';
 app.locals.ENV = env;
 app.locals.ENV_DEVELOPMENT = env == 'development';
 
 
 // Ruta por defecto, que vaya al index.ejs

app.use('/', index);
app.use('/usuario', usuario);
app.use('/login',login);
 // Si se produce un error en la ruta, enviamos un not found
 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err); // Dejamos el error lo maneje una de dos funciones
 });
 
 // Si estamos en un entorno de desarrollo (que se pasa poniéndolo en la consola)
 // Mostramos un error con la pila de llamadas para poder debugear
 if (app.get('env') === 'development') {
     app.use(function(err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
             message: err.message,
             error: err,
             title: 'error'
         });
     });
 }
 
 // En cualquier otro caso, suponemos que NO estamos en un entorno de desarrollo
 // Por lo que iniciamos el modo producción, en el que no se muestra la pila de
 // llamadas
 app.use(function(err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
         message: 'Esta página no existe :(',
         error: {},
         title: 'error'
     }); 
 });
 
 module.exports = app;
