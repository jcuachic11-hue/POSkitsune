const jwt = require('jsonwebtoken');

// CORRECCIÓN: Usar la variable de entorno, igual que en el login
const claveSecreta = process.env.JWT_SECRET || 'clave_secreta_local'; 

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