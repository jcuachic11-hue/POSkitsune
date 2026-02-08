// scr/index.js
const express = require('express');
const app = express();
const connection = require('./bd/mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint de prueba para verificar que la app responde en Railway
app.get('/', (req, res) => {
  res.send('POSkitsune está corriendo en Railway');
});

// Endpoint de login con generación de JWT
app.post('/auth/login', (req, res) => {
  const { usuario, password } = req.body;

  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ status: 'error', message: 'Error interno' });
      }

      if (results.length > 0) {
        // Generar JWT usando la variable de entorno JWT_SECRET
        const token = jwt.sign(
          { id: results[0].id, usuario: results[0].usuario, rol: results[0].rol },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.json({ status: 'success', token });
      } else {
        res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
      }
    }
  );
});

// Puerto: Railway inyecta process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});