const jwt = require('jsonwebtoken');
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
