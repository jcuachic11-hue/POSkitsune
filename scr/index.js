// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('scr/publico'));

const auth = require('./modulos/auth/rutas');
const productos = require('./modulos/productos/rutas');
const usuarios = require('./modulos/usuarios/rutas');
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

