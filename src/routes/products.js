import { Router } from "express";
import productModel from "../models/ProductsModel.js";

const Products = Router()


//get que muestra los productos que tengo 
Products.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, query } = req.query
        limit = parseInt(limit)
        page = parseInt(page)
        const filter = query ? { nombre: { $regex: query, $options: "i" } } : {};
        const options = { limit, page }
        const resultado = await productModel.paginate(filter, options)

        res.render('index', {
            products: resultado.docs,
            totalPages: resultado.totalPages,
            page: resultado.page,
            hasPrevPage: resultado.hasPrevPage,
            hasNextPage: resultado.hasNextPage,
            prevPage: resultado.prevPage,
            nextPage: resultado.nextPage,
            query,
            limit
        });

    }
    catch (error) {
        res.status(500).json({ message: 'error', error })
    }

})

//get para seleccionar los productos por id
Products.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const producto = productModel.find(u => u.id === id)

        if (!producto) {
            res.status(404).json({ error: 'producto no encontrado' })
        } else {
            res.json(producto);
        }
    }
    catch (error) {

    }

})

//post para agregar un producto
Products.post('/', async (req, res) => {
    try {
        const { id, nombre, precio, cantidad, disponible } = req.body
        const newProduct = productModel({ id, nombre, precio, cantidad, disponible })
        await newProduct.save()
        res.status(201).json(newProduct)

    }
    catch (error) {
        res.status(500).json({ message: "error", error })

    }
})

//put para actualizar un producto
Products.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, precio, cantidad, disponible } = req.body
        const productosFiltrados = await productModel.findOne({ _id: id })
        if (!productosFiltrados) {
            res.status(500).json({ message: 'usuario no encontrado' })
        }
        if (nombre) { productosFiltrados.nombre = nombre }
        if (precio) { productosFiltrados.precio = precio }
        if (cantidad) { productosFiltrados.cantidad = cantidad }
        if (disponible) { productosFiltrados.disponible = disponible }

        await productosFiltrados.save()
        res.status(200).json(productosFiltrados)
    }
    catch (error) {
        res.status(500).json({ message: 'error editor usuario', error })
    }

})

//delete para eliminar un producto
Products.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const productosEliminados = await productModel.deleteOne({ _id: id })
        if (productosEliminados.deletedCount > 0) {
            res.status(200).json({ message: 'producto eliminado' })
        }
        else {
            res.status(400).json({ message: 'producto no encontrado' })
        }
    }
    catch (error) {
        res.status(400).json({ message: 'producto no encontrado', error })
    }

})
// FIN SECCION PRODUCTOS
export default Products