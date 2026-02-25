const db = require('../../bd/mysql');

async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        // Búsqueda simple
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        if (rows.length === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Comparación directa de texto plano
        if (password === user.password) {
            return res.status(200).json({ 
                error: false, 
                mensaje: "Logueado con éxito",
                usuario: user.usuario 
            });
        } else {
            return res.status(401).json({ error: true, mensaje: "Clave incorrecta" });
        }

    } catch (err) {
        // ESTO APARECERÁ EN TUS LOGS DE RAILWAY
        console.error("--- ERROR EN LOGIN ---");
        console.error("Mensaje:", err.message);
        console.error("Código SQL:", err.code);
        
        return res.status(500).json({ 
            error: true, 
            mensaje: "Error de conexión o base de datos",
            detalle: err.message 
        });
    }
}

module.exports = { login };