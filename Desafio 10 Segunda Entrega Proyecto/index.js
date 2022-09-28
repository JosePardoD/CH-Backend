const express = require('express')
const routerProductos = require('./routers/productos')
const routerCarrito = require('./routers/carrito')
//const routerAdmin = require('./routers/admin')

const app = express()
let acceso = true

app.use(express.urlencoded({extended: true}))
app.use(express.json())

if (acceso === true){
    app.use('/api/productos', routerProductos)
    app.use('/api/carrito', routerCarrito)
}else {
    console.log("no teine acceso")
}





/* Server Listen */
const PORT = process.env.PORT || 8081
const server = app.listen(PORT , () => console.log(`servidor Levantado ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))