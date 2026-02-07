const conexion = require('../../bd/mysql');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { usuario, password } = req.body;
  try {
    const [rows] = await conexion.query(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Normalizar valores para evitar espacios o tipos raros
    const usuarioBD = String(user.usuario).trim();
    const passwordBD = String(user.password).trim();

    if (usuario.trim() !== usuarioBD || password.trim() !== passwordBD) {
      return res.status(401).json({ error: 'Login incorrecto' });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, usuario: usuarioBD, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Error de login:', error.message, error.stack);
    res.status(500).json({ error: 'Error interno en login' });
  }
}

module.exports = { login };
