import { Router } from "express";
import userModel from "../models/usersModel.js";

const router = Router()


router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users)
    }
    catch {
        res.status(500).json({ mesagge: "error", error })
    }
})

router.post('/', async (req, res) => {
    try {
        const { id, nombre, precio } = req.body
        const newUser = new userModel({ id, nombre, precio })
        await newUser.save()
        res.status(201).json(newUser)
    }
    catch (error) {
        res.status(500).json({ message: "error al crear user", error })
    }
})

router.put('/:uid', async (req, res) => {
    try {
        const { uid } = req.params
        const { nombre, precio } = req.body
        const user = await userModel.findOne({ _id: uid })

        if (!user) {
            res.status(404).json({ message: 'usuario no encontrado', error })
        }
        if (nombre) { user.nombre = nombre }
        if (precio) { user.precio = precio }
        await user.save()
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({ message: 'usuario no encontrado', error })
    }
})

router.delete('/:uid', async (req, res) => {
    try {
        const { uid } = req.params
        const deleteUser = await userModel.deleteOne({ _id: uid })
        if (deleteUser.deletedCount > 0) {
            res.status(200).json({ mesagge: 'eliminado correctamente' })
        }
        else { res.status(404).json({ mesagge: 'usuaario no encontrado' }) }
    }
    catch (error) {
        res.status(404).json({ mesagge: 'usuaario no encontrado', error })
    }
})

export default router