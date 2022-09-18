use ecommerce;
db.createCollection('productos');
db.createCollection('mensajes');
db.productos.insertMany([
    {

        "title": "Manzana",
        "price": 100,
        "description":"Fruta",
        "stock": 30
    },
    {

        "title": "Pera",
        "price": 110,
        "description":"Fruta",
        "stock": 28
    },
    {

        "title": "Marcador",
        "price": 300,
        "description":"Util Escolar",
        "stock": 20
    },
    {
        "title": "Bicicleta",
        "price": 1700,
        "description":"",
        "stock": 400
    },
    {
        "title": "Billetera",
        "price": 150,
        "description":"Uso diario",
        "stock": 500
    },
    {
        "title": "Tablet",
        "price": 3360,
        "description":"aparato electronico",
        "stock": 600
    },
    {
        "title": "Motocicleta",
        "price": 4470,
        "description":"Medio de transporte",
        "stock": 700
    },
    {
        "title": "Televisor Led",
        "price": 5000,
        "description":"aparato electronico",
        "stock": 540
    },
    {
        "title": "computador",
        "price": 2350,
        "description":"aparato electronico",
        "stock": 1200
    },
    {
        "title": "Estufa",
        "price": 2860,
        "description":"Elemento de cocina",
        "stock": 70
    }
]);

db.mensajes.insertMany([{mensaje: "hola"}, {mensaje: "como estas"}])
db.mensajes.find().pretty()
db.productos.find().pretty();
db.productos.insertOne({
        "title": "Cuaderno",
        "price": 152,
        "description":"Util escolar",
        "stock": 245
    });
db.productos.find({price: {$lt: 1000}});
db.productos(find {price: {$gt: 1000, $lt: 3000 });
db.productos.find({price: {$gt: 3000}});
db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
db.productos.updateMany({}, {$inc: {stock: 100}});
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
db.productos.deleteMany({price: {$lt: 1000}});
db.productos.find().pretty();
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]});
mongo -u pepe -p --authenticationDatabase ecommerce 

