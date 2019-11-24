const mongoose = require('mongoose');

const FoodOrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
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
    status: {
        type: String,
        default: 'en espera'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('foodorder', FoodOrderSchema);