// scr/bd/mysql.js
const mysql = require('mysql2');

// Imprimir valores crudos para depuración
console.log("MYSQLHOST:", JSON.stringify(process.env.MYSQLHOST));
console.log("MYSQLPORT:", JSON.stringify(process.env.MYSQLPORT));
console.log("MYSQLUSER:", JSON.stringify(process.env.MYSQLUSER));
console.log("MYSQLPASSWORD:", JSON.stringify(process.env.MYSQLPASSWORD));
console.log("MYSQLDATABASE raw:", JSON.stringify(process.env.MYSQLDATABASE));

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  // trim elimina espacios invisibles al inicio/fin
  database: process.env.MYSQLDATABASE ? process.env.MYSQLDATABASE.trim() : undefined
});

connection.connect(err => {
  if (err) {
    console.error("Error al conectar a MySQL:", err.message);
    return;
  }
  console.log("Conectado a MySQL correctamente");
});

module.exports = connection;
