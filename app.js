import express from "express"
import mongoose from "mongoose"
import handlebars from 'express-handlebars'
import Products from "./src/routes/products.js"
import Carts from "./src/routes/carts.js"

const app = express()
const PORT = 8080
app.use(express.json())



app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use('/api/products', Products)
app.use('/api/carts', Carts)



mongoose.connect('mongodb://localhost:27017/dataBaseCoder')
    .then(() => {
        console.log("conectado correctamente")
    })
    .catch(error => {
        console.log("no es posible conectarse")
    })

app.listen(PORT, () => {
    console.log("conectado en el puerto 8080")
})




