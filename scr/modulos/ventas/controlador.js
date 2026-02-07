const conexion = require('../../bd/mysql');

// Carrito  
let carrito = [];

// Agregar producto 
exports.agregarCarrito = async (req, res) => {
    let { idProducto, cantidad } = req.body;   
cantidad = parseInt(cantidad, 10);         
if (isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
}

    try {
        const [rows] = await conexion.query('SELECT * FROM productos WHERE id=?', [idProducto]);
        if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });

        const producto = rows[0];
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad
        });

        res.json({ mensaje: 'Producto agregado al carrito', carrito });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Listar carrito
exports.listarCarrito = (req, res) => {
    res.json(carrito);
};

// Totales del carrito
exports.totalesCarrito = (req, res) => {
    const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    res.json({ totalPrecio, totalItems });
};

// Comprar  
exports.comprar = async (req, res) => {
    try {
        for (const item of carrito) {
            await conexion.query(
                'UPDATE productos SET stock = stock - ? WHERE id=?',
                [item.cantidad, item.id]
            );
        }
        carrito = [];
        res.json({ mensaje: 'Compra realizada con éxito' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

