const admin = require('firebase-admin')
const config= require('./bd/carrito-firebase-firebase-adminsdk-be4wo-fe822dd5a0.json')


class Producto {
    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(config),
                databaseURL: 'https://coder-73b62.firebaseio.com'
            })
    }
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

    async getAll() {
        try {
           const db = admin.firestore()
            const query = db.collection('productos')
            const snapshot = await query.get();
           /* const encontrado = snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data()),doc.id;
            });
            */
            return snapshot.docs.map(doc => doc.data());;
        } catch (error) {
            throw Error(error.message)
        }
    }

    async getById(id) {
        try {
            const db = admin.firestore()
            const query = db.collection('productos')
            const doc = query.doc(String(id))
            const encontrado = await doc.get()
            return encontrado.data()
        } catch (error) {
            throw Error(error.message)
        }
    }

    async deleteById(id) {
        try {
            const db = admin.firestore()
            const query = db.collection('productos')
            const doc = query.doc(String(id))
            await doc.delete()
            return doc
        } catch (error) {
            throw Error(error.message)
        }
    }

    
}

module.exports = Producto