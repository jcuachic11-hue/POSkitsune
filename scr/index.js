/*require('dotenv').config();
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
});*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./bd/mysql'); 
const productosRutas = require('./modulos/productos/rutas');
const loginRutas = require('./modulos/usuarios/rutas');

const app = express();
app.use(cors());
app.use(express.json());

// FUNCIÓN QUE CORRIGE LA TABLA AUTOMÁTICAMENTE
async function configurarTablas() {
    try {
        console.log("Verificando tablas en la base de datos...");
        // Esto crea la tabla con AUTO_INCREMENT si no existe
        await db.query(`
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                precio DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL DEFAULT 0
            )
        `);
        // Esto arregla el ID por si la tabla ya existía pero estaba mal
        await db.query(`ALTER TABLE productos MODIFY COLUMN id INT AUTO_INCREMENT`);
        console.log("¡Base de datos lista para trabajar!");
    } catch (err) {
        console.log("Aviso en DB (puede que ya esté configurada):", err.message);
    }
}
configurarTablas();

// RUTAS
app.use('/productos', productosRutas);
app.use('/login', loginRutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});