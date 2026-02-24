/*const express = require('express');
const router = express.Router();
const controlador = require('./controlador.js'); 

// Ruta de login
router.post('/login', controlador.login);

module.exports = router;*/

const jwt = require('jsonwebtoken');
const { claveSecreta } = require('./middleware');

function login(req, res) {
  const { usuario, password } = req.body;

  // Aquí deberías validar contra tu DB
  if (usuario === 'admin' && password === '1234') {
    const token = jwt.sign({ usuario }, claveSecreta, { expiresIn: '1h' });
    res.json({ token }); // Esta línea es la clave
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
}

module.exports = { login };


