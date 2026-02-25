const db = require('../../bd/mysql');

async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        // 1. Buscamos el usuario en la base de datos
        // Usamos [rows] para extraer los resultados directamente
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        // 2. Verificamos si el usuario existe
        if (rows.length === 0) {
            return res.status(401).json({ error: true, mensaje: "Usuario no encontrado" });
        }

        const user = rows[0];

        // 3. Comparación de texto plano (Como tú lo pediste, sin bcrypt)
        if (password === user.password) {
            // Login Exitoso
            return res.status(200).json({
                error: false,
                mensaje: "Bienvenido",
                body: {
                    id: user.id,
                    nombre: user.nombre,
                    rol: user.rol
                }
            });
        } else {
            // Contraseña incorrecta
            return res.status(401).json({ error: true, mensaje: "Contraseña incorrecta" });
        }

    } catch (err) {
        console.error("ERROR EN BASE DE DATOS:", err.message);
        return res.status(500).json({ error: true, mensaje: "Error interno del servidor" });
    }
}

// Exportación clara para que el archivo de rutas no falle
module.exports = {
    login
};