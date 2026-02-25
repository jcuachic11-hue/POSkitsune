const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,        // Bajamos el límite para que Railway no se sature
    queueLimit: 0,
    connectTimeout: 20000,     // Le damos 20 segundos para conectar antes de fallar
    enableKeepAlive: true,     // Mantiene la conexión despierta
    keepAliveInitialDelay: 10000
});

module.exports = pool;