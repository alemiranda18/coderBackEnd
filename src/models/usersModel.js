import mongoose from "mongoose"

const userCollection = "usuarios"
const userSchema = mongoose.Schema({
    alumno: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    calificacion: Number,
    grado: Number,
    modalidad: String,
    aprobado: Boolean
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel