const db = require('../../bd/mysql');

async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        // 1. Verificación de que el body no llegue vacío
        if (!usuario || !password) {
            return res.status(400).json({ error: "Faltan datos (usuario/password)" });
        }

        // 2. Consulta a la DB usando execute
        // Usamos [filas] para desestructurar el resultado de la promesa
        const [filas] = await db.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        // 3. Verificamos si existe el usuario
        if (filas.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const user = filas[0];

        // 4. Comparación directa (Texto plano, sin bcrypt)
        if (password === user.password) {
            return res.status(200).json({
                error: false,
                mensaje: "Bienvenido",
                id: user.id
            });
        } else {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

    } catch (err) {
        // Esto imprimirá el error real en los logs de Railway
        console.error("ERROR EN EL PROCESO DE LOGIN:", err);

        // Esto te enviará el error real al navegador (F12 -> Network -> Response)
        return res.status(500).json({ 
            error: "Error interno", 
            mensaje: err.message, 
            codigo: err.code 
        });
    }
}

module.exports = {
    login
};