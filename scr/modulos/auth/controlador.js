const db = require('../../bd/mysql');

/**
 * Función de Login
 * @param {*} req Request de Express
 * @param {*} res Response de Express
 */
async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        // 1. Verificación básica de datos entrantes
        if (!usuario || !password) {
            return res.status(400).json({ 
                error: true, 
                mensaje: "Usuario y contraseña son requeridos" 
            });
        }

        // 2. Consulta a la base de datos
        // Usamos [rows] porque mysql2/promise devuelve un array [datos, metadatos]
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        // 3. ¿El usuario existe?
        if (rows.length === 0) {
            return res.status(401).json({ 
                error: true, 
                mensaje: "Usuario no encontrado" 
            });
        }

        const user = rows[0];

        // 4. Comparación de texto plano (SIN bcrypt)
        // He añadido un trim() para evitar errores por espacios invisibles
        if (password.trim() === user.password.trim()) {
            return res.status(200).json({
                error: false,
                mensaje: "Acceso concedido",
                body: {
                    id: user.id,
                    nombre: user.nombre,
                    rol: user.rol
                }
            });
        } else {
            return res.status(401).json({ 
                error: true, 
                mensaje: "Contraseña incorrecta" 
            });
        }

    } catch (err) {
        // Log para Railway
        console.error("DETALLE TÉCNICO DEL ERROR:", err);

        // Respuesta con el error real para que sepas qué está mal en la DB
        return res.status(500).json({ 
            error: true, 
            mensaje: "Error interno en el servidor",
            detalle_tecnico: err.message,
            codigo_sql: err.code
        });
    }
}

module.exports = {
    login
};