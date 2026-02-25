/*const db = require('../../bd/mysql');

async function todos(req, res) {
    try {
        const [filas] = await db.execute('SELECT * FROM productos');
        res.json(filas);
    } catch (err) {
        res.status(500).json({ error: true, mensaje: err.message });
    }
}

async function agregar(req, res) {
    try {
        const { nombre, precio, stock } = req.body;
        
        // Validación simple
        if (!nombre || !precio) {
            return res.status(400).json({ error: true, mensaje: "Faltan campos obligatorios" });
        }

        await db.execute(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock || 0]
        );

        res.status(201).json({ error: false, mensaje: "Producto guardado con éxito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, mensaje: "Error al guardar: " + err.message });
    }
}

module.exports = {
    todos,
    agregar
};*/

const db = require('../../bd/mysql');

// Obtener todos los productos
async function todos(req, res) {
    try {
        const [filas] = await db.execute('SELECT * FROM productos');
        res.json(filas);
    } catch (err) {
        res.status(500).json({ error: true, mensaje: err.message });
    }
}

// Agregar un producto nuevo
async function agregar(req, res) {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        
        if (!nombre || !precio) {
            return res.status(400).json({ error: true, mensaje: "Nombre y precio son obligatorios" });
        }

        // NO incluimos el campo 'id' aquí, la DB lo pone sola
        const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
        const valores = [nombre, descripcion || '', precio, stock || 0];

        await db.execute(sql, valores);

        res.status(201).json({ error: false, mensaje: "¡Producto guardado con éxito!" });
    } catch (err) {
        console.error("Error al guardar producto:", err);
        res.status(500).json({ error: true, mensaje: "Error en la base de datos: " + err.message });
    }
}

module.exports = {
    todos,
    agregar
};