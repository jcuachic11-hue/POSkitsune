require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // <-- Agregado por seguridad para formularios
app.use(express.static('scr/publico'));

// --- RUTAS ---
const auth = require('./modulos/auth/rutas');
const productos = require('./modulos/productos/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const ventas = require('./modulos/ventas/rutas');

// Es mejor darles un prefijo para que no haya errores de "Not Found"
app.use('/api/auth', auth); 
app.use('/api/productos', productos);
app.use('/api/usuarios', usuarios);
app.use('/api/ventas', ventas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});