const express = require('express');
const router = express.Router();
const controlador = require('./controlador.js'); 

// Ruta de login
router.post('/login', controlador.login);

module.exports = router;
