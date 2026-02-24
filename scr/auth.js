/*const jwt = require('jsonwebtoken');
const claveSecreta = 'tu_clave_secreta';

function verificarToken(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) return res.status(403).json({ error: 'Token requerido' });

    const token = header.split(' ')[1];
    jwt.verify(token, claveSecreta, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });
        req.usuario = decoded;
        next();
    });
}

module.exports = { verificarToken, claveSecreta };
*/

// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('scr/publico'));

const auth = require('./modulos/auth/rutas');
const productos = require('./modulos/productos/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const ventas = require('./modulos/ventas/rutas');

app.use('/', auth);
app.use('/productos', productos);
app.use('/usuarios', usuarios);
app.use('/ventas', ventas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

