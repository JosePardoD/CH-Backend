const contenedor = require('./Contenedor.js')
const container = new contenedor('products')

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;
const httpServer = require('http').createServer(app);
const io = require("socket.io")(server)(httpServer,{
  cors:{origin:"*"},
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

server.on('error', (error) => console.log(`Error en servidor ${error}`));




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
]


io.on('connection', (socket) => {
  console.log("new conecction")
  io.sockets.emit("products",products);
  io.sockets.emit("chat ",chat);


  socket.on('newMessage', (msg) => {
    chat.push(msg);
    io.sockets.emit("chat",chat);
  });

  socket.on('addProduct', (data) => {
    const saveProducts = await container.save(data)
    const products = await container.getAll()
    io.sockets.emit("products",products);
  });

});

app.get('/products', async (req, res) => { 
  const products = await container.getAll()
  res.render('productslist', { products: products, productsExist: true });
});


app.get('/form', (req, res) => {
  res.render('formulario');
});

app.post('/products', async (req,res)=>{
  let {body} = req;
  const saveProducts = await container.save(body)
  res.redirect('/products')
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});