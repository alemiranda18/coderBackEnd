import { Router } from "express";
import cartModel from "../../models/cartsModel";

const Carts = Router()

// generar el carrito
const carritos = [];

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

Carts.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const carritoId = await cartModel.findById(id).populate('productos.productosId')
        if (!carritoId) {
            res.status(400).json({ message: 'producto no encontrado' })
        }

        res.status(200).json(carritoId)
    }
    catch (error) {
        res.status(500).json({ message: 'producto no encontrado', error })
    }
})

//post para agregar prod al carrito
Carts.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { productId, cantidad } = req.body
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
export default Carts 