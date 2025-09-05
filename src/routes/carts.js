import { Router } from "express";
import cartModel from "../../models/cartsModel.js";

const Carts = Router()

//post para generar el carrito
Carts.post('/', async (req, res) => {
    try {
        const { productos } = req.body
        const nuevoCarrito = new cartModel({
            productos: productos || []
        })
        await nuevoCarrito.save()
        res.status(201).json(nuevoCarrito);

    }
    catch (error) {
        res.status(500).json({ message: 'error', error })
    }
});


//get para ver todos los carritos
Carts.get('/', async (req, res) => {
    try {
        const ProdCarrito = await cartModel.find().populate("productos.productosId")
        if (ProdCarrito.length === 0) {
            res.status(404).json({ message: "producto no encontrado" })
            return
        }
        else {
            res.status(200).json(ProdCarrito)
        }
    }
    catch {
        res.status(500).json({ message: 'producto no encontrado', error })
    }

})

//get para ver los carritos por Id
Carts.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const carrito = await cartModel.findById(cid).populate('productos.productsId')
        if (!carrito) {
            res.status(404).render('cart', { error: "Carrito no encontrado" });
        }

        res.render('cart', { carrito })
    }
    catch (error) {
        res.status(500).json({ message: 'producto no encontrado', error })
    }
})

//post para agregar prod al carrito
Carts.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { cantidad } = req.body
        const carrito = await cartModel.findById(cid)
        if (!carrito) {
            res.status(400).json({ message: 'producto no encontrado' })
        }

        const productosRepetidos = await carrito.productos.find(
            p => p.productId.toString() === pid)
        if (productosRepetidos) {
            productosRepetidos.cantidad += cantidad
        }
        else {
            carrito.productos.push({ productId: pid, cantidad })
        }

        await carrito.save()
    }
    catch {
        res.status(500).json({ message: 'producto no encontrado', error })

    }
})

// delete para eliminar el producto del carrito 
Carts.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const carrito = await cartModel.findById(cid)

        if (!carrito) {
            return res.status(404).json({ message: 'Carrito no encontrado' })
        }
        const prodCarrito = carrito.productos.length;
        carrito.productos = carrito.productos.filter(
            p => p.productId.toString() !== pid
        )
        if (carrito.productos.length == prodCarrito) {
            res.status(404).json({ message: "producto no encontrado" })
        }
        await carrito.save()
        res.status(200).json({ message: 'Producto eliminado del carrito', carrito });
    }

    catch {
        res.status(400).json({ message: 'producto no encontrado', error })

    }
})

//eliminar todos los productos del carrito 
Carts.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const carrito = await cartModel.findById(cid)
        if (!carrito) {
            return res.status(400).json({ message: "carrito no encontrado" })
        }
        carrito.productos = []
        await carrito.save()
        res.status(200).json({ message: "Todos los productos eliminados del carrito", carrito })
    }
    catch (error) {
        res.status(400).json({ message: 'producto no encontrado', error })
    }

})

//put para actualizar los productos del carrito con un array de productos
Carts.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const { productos } = req.body
        const carrito = await cartModel.findById(cid)
        if (!carrito) {
            return res.status(404).json({ message: 'carrito no encontrado' })
        }

        carrito.productos = productos
        await carrito.save()
        res.status(200).json({ message: 'Productos del carrito actualizados', carrito });
    }
    catch (error) {
        res.status(500).json({ message: 'producto no encontrado', error })
    }
})

//put que actualiza la cantidad de ejemplares pasado por req.body
Carts.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { cantidad } = req.body
        const carrito = await cartModel.findById(cid)
        if (!carrito) {
            return res.status(404).json({ message: "producto no encontrado" })
        }
        const producto = carrito.productos.find(p => p.productId.toString() === pid)
        if (!producto) {
            return res.status(404).json({ message: 'producto no encontrado' })
        }
        producto.cantidad = cantidad
        await carrito.save()
        res.status(200).json({ message: 'Cantidad actualizada', carrito });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar cantidad', error })
    }
})

export default Carts 