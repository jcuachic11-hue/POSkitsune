// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // <--- 1. IMPORTANTE: Importar cors
const app = express();

// --- CONFIGURACIÓN DE MIDDLEWARES ---
app.use(cors()); // <--- 2. IMPORTANTE: Permitir peticiones externas
app.use(express.json());
app.use(express.static('scr/publico'));

// --- RUTAS ---
const auth = require('./modulos/auth/rutas');
const productos = require('./modulos/productos/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const ventas = require('./modulos/ventas/rutas');

app.use('/', auth);
app.use('/productos', productos);
app.use('/usuarios', usuarios);
app.use('/ventas', ventas);

// --- CONFIGURACIÓN DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;

// Agregamos '0.0.0.0' para que Railway pueda mapear el puerto correctamente
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});