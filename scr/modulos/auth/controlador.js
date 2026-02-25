const db = require('../../bd/mysql');

async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        // Validación básica
        if (!usuario || !password) {
            return res.status(400).json({ error: true, mensaje: "Usuario y contraseña requeridos" });
        }

        // Consulta a la base de datos
        const [filas] = await db.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        if (filas.length === 0) {
            return res.status(401).json({ error: true, mensaje: "El usuario no existe" });
        }

        const user = filas[0];

        // Verificación de contraseña (asumiendo texto plano según tus datos)
        if (password === user.password) {
            return res.status(200).json({
                error: false,
                mensaje: "Autenticación exitosa",
                usuario: user.usuario
            });
        } else {
            return res.status(401).json({ error: true, mensaje: "Contraseña incorrecta" });
        }

    } catch (err) {
        console.error("Error en Login:", err);
        // Devolvemos JSON siempre, para que el frontend no rompa
        return res.status(500).json({ 
            error: true, 
            mensaje: "Error interno del servidor",
            detalles: err.message 
        });
    }
}

module.exports = {
    login
};