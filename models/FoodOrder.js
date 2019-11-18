const mongoose = require('mongoose');

const FoodOrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Precio debe ser mayor a 0']
    },
    orderDetails: {
        type: String
    },
    status: {
        type: String,
        default: 'En espera'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('foodorder', FoodOrderSchema);