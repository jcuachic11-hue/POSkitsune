const conexion = require('../../bd/mysql');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { usuario, password } = req.body;
  try {
    console.log("Body recibido crudo:", req.body);

    const [rows] = await conexion.query(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (rows.length === 0) {
      console.log("No se encontró usuario en BD para:", usuario);
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];
    console.log("Fila completa de BD:", user);
    console.log("Usuario en BD:", user.usuario);
    console.log("Password en BD:", user.password);
    console.log("Valor usuario del body:", usuario);
    console.log("Valor password del body:", password);

    const usuarioBD = String(user.usuario).trim();
    const passwordBD = String(user.password).trim();

    if (usuario?.trim() !== usuarioBD || password?.trim() !== passwordBD) {
      console.log("Comparación fallida:", usuario?.trim(), password?.trim(), "vs", usuarioBD, passwordBD);
      return res.status(401).json({ error: 'Login incorrecto' });
    }

    const token = jwt.sign(
      { id: user.id, usuario: usuarioBD, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
  console.error('Error de login:', error);
  res.status(500).json({
    error: 'Error interno en login',
    detalle: error.message || 'Sin mensaje'
  });

  }


}

module.exports = { login };
