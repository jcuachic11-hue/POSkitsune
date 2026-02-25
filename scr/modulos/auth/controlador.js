// /app/scr/modulos/auth/controlador.js

async function login(usuarioEntrante, passwordEntrante) {
    try {
        // IMPORTANTE: El [filas] entre corchetes es vital en mysql2/promise
        const [filas] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuarioEntrante]);

        // Si no hay filas, el usuario no existe
        if (!filas || filas.length === 0) {
            console.log("Usuario no encontrado en la DB");
            return null; 
        }

        const user = filas[0];

        // Comparación directa (sin bcrypt)
        if (passwordEntrante === user.password) {
            console.log("Login exitoso");
            return user;
        } else {
            console.log("Contraseña incorrecta");
            return null;
        }

    } catch (error) {
        // Esto imprimirá el error exacto en los LOGS de Railway para que no adivinemos
        console.error("ERROR CRÍTICO EN SQL:", error.sqlMessage || error.message);
        throw error; 
    }
}