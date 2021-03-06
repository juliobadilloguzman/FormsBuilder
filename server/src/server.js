//********** Requires ***********/
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('../src/routes/auth.route');
const formRoutes = require('../src/routes/form.route');
const userRoutes = require('../src/routes/user.route');


//********** Servidor ***********/
const app = express();

//********** Configuraciones ***********/

//Puerto del servidor
app.set('port', process.env.PORT || 3000);

//********** Middlewares ***********/

//Log de peticiones por consola
app.use(morgan('dev'));

//Enviar y recibir jsons
app.use(express.json());

//Aceptar datos de formularios
app.use(express.urlencoded({ extended: true }));

//CORS
app.use(cors());
// Configurar cabeceras y cors



//********** Rutas ***********/
app.use('/auth', authRoutes);
app.use('/form', formRoutes);
app.use('/users', userRoutes);

//********** Global variables ***********/

//Para usarse en el jsonwebtoken
app.set('llavetoken', "primerparcialhugo");

//********** Starting the server ***********/
app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));
    console.log('Key token: ' + app.get('llavetoken'));
});