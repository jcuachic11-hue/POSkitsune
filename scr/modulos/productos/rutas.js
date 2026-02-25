const express = require('express');
const router = express.Router();
const controlador = require('./controlador');

// Eliminamos cualquier referencia a "seguridad" o "token" aquí
router.get('/', controlador.todos);
router.post('/', controlador.agregar);

module.exports = router;