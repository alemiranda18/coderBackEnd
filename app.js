import express from "express"
import mongoose from "mongoose"
import handlebars from 'express-handlebars'


const app = express()
const PORT = 8080

mongoose.connect('mongodb://localhost:27017/dataBaseCoder')

app.use(express.json())
//inicio hbs
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")





