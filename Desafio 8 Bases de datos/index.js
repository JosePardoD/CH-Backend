const contenedor = require('./Contenedor.js')
const container = new contenedor('products')

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer,{
  cors: {origin:"*",},
});

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'hbs'); 
app.set('views', './views');  
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
); 


let chat=[
  {
    email:"admin@admin.com",
    message:"Welcome",
    date: new Date().toLocaleDateString()
  }
];

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/form', (req, res) => {
  res.render('formulario');
});

io.on('connection',  async(socket) => {
  console.log("new conecction");
  const productos = await container.getAll();
  io.sockets.emit("products",productos);
  io.sockets.emit("chat",chat);


  socket.on("newMessage", (data) => {
    chat.push(data);
    io.sockets.emit("chat",chat);
  });

  socket.on('addProduct', async(data) => {
    const saveProducts = await container.save(data);
    const products = await container.getAll();
    io.sockets.emit("products",products);
  });


});





app.get('/products', async (req, res) => { 
  const products = await container.getAll()
  res.render('productslist', { products: products, productsExist: true });
});




app.post('/products', async (req,res)=>{
  let {body} = req;
  const saveProducts = await container.save(body)
  res.redirect('/products')
});

httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto `);
});