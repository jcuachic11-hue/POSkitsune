// bd/mysql.js
const mysql = require('mysql2/promise'); // <--- REVISA ESTO: Debe tener '/promise'

const dbConfig = {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    // Esto ayuda a que Railway no corte la conexión por inactividad
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

module.exports = pool;