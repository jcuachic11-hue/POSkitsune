const express = require('express');
const path = require('path');
const router = express.Router();
const controlador = require('./controlador.js');

// Mostrar login.html en la raíz
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../publico/login.html'));
});

// Procesar login
router.post('/login', controlador.login);

module.exports = router;

