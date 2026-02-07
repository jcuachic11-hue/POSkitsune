// Cargar variables de entorno desde .env
//require('dotenv').config();
console.log("Cargando index.js...");


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./bd/mysql');
console.log("Cargando MySQL...");
require('./bd/mysql');
console.log("MySQL cargado");





const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('scr/publico'));

console.log("Cargando rutas de auth...");
const auth = require('./modulos/auth/rutas');

console.log("Cargando rutas de productos...");
const productos = require('./modulos/productos/rutas');

console.log("Cargando rutas de usuarios...");
const usuarios = require('./modulos/usuarios/rutas');

console.log("Cargando rutas de ventas...");
const ventas = require('./modulos/ventas/rutas');


//const rutas = require('./rutas');



app.use('/', auth);
app.use('/productos', productos);
app.use('/usuarios', usuarios);
app.use('/ventas', ventas);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//prueba 
