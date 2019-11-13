const mongoose = require('mongoose');

const FoodMenuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('foodmenu', FoodMenuSchema);