const mongoose = require('mongoose')

const esquemaCarrito = new mongoose.Schema({
    productos: {type: Array, require: false},
    time: {type: String, require: false},
    name: {type: String, require: false}
})

module.exports = mongoose.model('carrito', esquemaCarrito)
