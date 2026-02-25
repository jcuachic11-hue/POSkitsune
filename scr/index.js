require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// 1. Middlewares de lectura (Obligatorios)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Importar Rutas
const auth = require('./modulos/auth/rutas');
const productos = require('./modulos/productos/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const ventas = require('./modulos/ventas/rutas');

// 3. Registrar Rutas (Usamos '/' para que coincida con tu frontend)
app.use('/', auth);
app.use('/productos', productos);
app.use('/usuarios', usuarios);
app.use('/ventas', ventas);

// 4. Archivos estáticos (Al final)
app.use(express.static('scr/publico'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en puerto: ${PORT}`);
});