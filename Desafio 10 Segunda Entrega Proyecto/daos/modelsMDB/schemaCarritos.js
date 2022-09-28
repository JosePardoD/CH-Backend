const mongoose = require('mongoose')

const esquemaCarrito = new mongoose.Schema({
    productos: {type: Array, require: true},
    time: {type: String, require: false},
    name: {type: String, require: true}
})

module.exports = mongoose.model('carrito', esquemaCarrito)
