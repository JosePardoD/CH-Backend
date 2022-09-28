const admin = require('firebase-admin')
const config= require('./bd/carrito-firebase-firebase-adminsdk-be4wo-fe822dd5a0.json')


class Producto {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: 'https://coder-73b62.firebaseio.com'
        })
    }

    async save(data) {
        const db = admin.firestore()
        const query = db.collection('productos')
        let time = new Date()
        data.time=time
        try {
            const doc = query.doc()
            const carrito = await doc.set(data)
            return carrito
        }catch (error){
            throw Error(error.message)
        }
    }

    
}

module.exports = Producto