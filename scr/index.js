// scr/index.js
const express = require('express');
const app = express();
const connection = require('./bd/mysql');

// Middleware para parsear JSON
app.use(express.json());

// Endpoint de prueba para verificar que la app responde en Railway
app.get('/', (req, res) => {
  res.send('POSkitsune está corriendo en Railway');
});

// Aquí irían tus rutas de login y demás
app.post('/auth/login', (req, res) => {
  const { usuario, password } = req.body;

  // Ejemplo básico de consulta a la tabla usuarios
  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ status: 'error', message: 'Error interno' });
      }

      if (results.length > 0) {
        // Aquí deberías generar tu JWT
        res.json({ status: 'success', message: 'Login correcto' });
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
