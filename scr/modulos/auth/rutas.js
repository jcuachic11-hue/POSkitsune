const express = require('express');
const router = express.Router();
const controlador = require('./controlador');

router.post('/login', controlador.login);

module.exports = router;