const { ObjectId } = require('mongoose')
const mongoose = require('mongoose')
const esquemaCar = require('./modelsMDB/schemaCarritos')

const Producto = require('./productoDaos')
const Productos = new Producto()


class Carrito {
    async connectMDB() {
        try {
            const URL = "mongodb+srv://Alucardead:lolo1997@cluster0.g87hauc.mongodb.net/?retryWrites=true&w=majority"
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })
        } catch (e) {
            console.log(e)
        }   
    }

    async newCarritos() {
        try {

            //let producto.time= "hola"
            await this.connectMDB()
            await esquemaCar.create({name:"casa",productos:[],time: new Date()})
            mongoose.disconnect()

        } catch (error) {
            throw Error(error.message)
        }
    }

    async getCarritoById(idC) {
        try {
            await this.connectMDB()
            const prodId = await esquemaCar.findById(idC)
            mongoose.disconnect()
            return prodId
        } catch (error) {
            throw Error(error.message)
        }
    }



    async deleteCarritoById(id) {
        try {
            await this.connectMDB()
            const borrado = await esquemaCar.findByIdAndDelete(id)
            mongoose.disconnect()
            return borrado
        } catch (error) {
            throw Error(error.message)
        }
    }


    async agregarProducto(idCarrito, idProducto) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
            let productoAtlas = await Productos.getById(idProducto)
            let idrand = random(1,10000)
            productoAtlas.idC = String(idrand)
            console.log(productoAtlas)

            await this.connectMDB()
            let agregar = await esquemaCar.findById(idCarrito)
            agregar.productos.push(productoAtlas)
            let buscarr =await esquemaCar.findByIdAndUpdate(idCarrito,{ $set: {productos: agregar.productos }});
            
            mongoose.disconnect()
            return true

        } catch (error){
            throw Error(error.message)
        }
    }

    async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
        try {
            let productoAtlas = await Productos.getById(idProducto)
            productoAtlas.idC=idEnCarrito
            console.log(productoAtlas)
            await this.connectMDB()
            let eliminar = await esquemaCar.findByIdAndUpdate(idCarrito,{ $pull: {productos: productoAtlas }});
            mongoose.disconnect()
        } catch (error){
            throw Error(error.message)
        }
    }
}

module.exports = Carrito
