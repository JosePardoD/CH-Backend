const contenedor = require('./Contenedor.js')
const container = new contenedor('products')

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;



const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

