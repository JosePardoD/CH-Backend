const contenedor = require('./Contenedor.js')
const container = new contenedor('products')

const express = require('express');
const app = express();
const PORT = 8080;



const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');






app.get('/products', async (req, res) => { 
  const products = await container.getAll()
  res.render('products.pug', { title: 'Vista de Productos', products: products });
});


app.get('/form', (req, res) => {
  res.render('form.pug',{title:'Ingrese Producto'});
});

app.post('/products', async (req,res)=>{
  let {body} = req;
  const saveProducts = await container.save(body)
  res.redirect('/products')
})