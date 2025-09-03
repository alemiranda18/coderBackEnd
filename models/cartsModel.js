import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
    productos: [
        {
            ProductId: {
                type: mongoose.Schema.type.OjectId,
                ref: 'productos'
            }
        },
        {
            cantidad: {
                type: Number,
                default: 1
            }
        }
    ]
})
const cartModel = mongoose.model('carts', cartSchema)
export default cartModel;