import mongoose from "mongoose"

const userCollection = "productos"

const userSchema = mongoose.Schema({
    id: Number,
    nombre: String,
    precio: Number,
    cantidad: Number,
    disponible: Boolean
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel