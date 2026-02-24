// scr/db/mysql.js
const mysql = require('mysql2/promise');

// Configuración de la conexión
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',          // tu usuario de MySQL
    password: '', // tu contraseña de MySQL
    database: 'kitsune'   // tu base de datos
});

// Exporta directamente el pool
module.exports = pool;
