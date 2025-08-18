import express from "express"
import mongoose from "mongoose"
import handlebars from 'express-handlebars'
import router from "./routes/usersRoutes.js"

const app = express()
const PORT = 8080

mongoose.connect('mongodb://localhost:27017/dataBaseCoder')
    .then(() => {
        console.log("conectado correctamente")
    })
    .catch(error => {
        console.log("no es posible conectarse")
    })
app.use(express.json())
app.use('/api/users', router)

app.listen(PORT, () => {
    console.log("conectado en el puerto 8080")
})




