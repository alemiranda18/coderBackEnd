import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "productos"

const ProductSchema = mongoose.Schema({
    id: Number,
    nombre: {
        type: String,
        index: true
    },
    precio: Number,
    cantidad: Number,
    disponible: Boolean,
})
ProductSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, ProductSchema)

export default productModel