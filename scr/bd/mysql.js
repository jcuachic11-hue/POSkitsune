const mysql = require("mysql2/promise");

console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLPORT:", process.env.MYSQLPORT);
console.log("MYSQLUSER:", process.env.MYSQLUSER);
console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD ? "****" : "EMPTY");
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);

let pool;

try {
  pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Probar conexión sin cerrar el proceso si falla
  pool.getConnection()
    .then(conn => {
      console.log("Connected to MySQL");
      conn.release();
    })
    .catch(err => {
      console.error("Error al conectar a MySQL:", err.message);
      // No cerrar el proceso, solo loguear
    });

} catch (err) {
  console.error("Error creando el pool MySQL:", err.message);
}

module.exports = pool;
