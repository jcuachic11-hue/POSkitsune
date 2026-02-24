// Cargar variables de entorno desde .env
/*require('dotenv').config();

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
});*/


// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const app = express();

// Middleware global
app.use(express.json());
app.use(express.static('scr/publico'));

// Importar routers (cada archivo debe terminar con: module.exports = router;)
const authRoutes = require('./modulos/auth/rutas');
const productosRoutes = require('./modulos/productos/rutas');
const usuariosRoutes = require('./modulos/usuarios/rutas');
const ventasRoutes = require('./modulos/ventas/rutas');

// Usar routers
app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/ventas', ventasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
