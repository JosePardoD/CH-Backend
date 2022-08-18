const contenedor = require('./Contenedor')
const container = new contenedor('productos')

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

app.set('view engine', 'ejs');



app.get('/products', async (req, res) => {
  const productos = await container.getAll()
  
  res.render('pages/products', { title: 'Listado de Productos', products: productos });   
});


app.get('/form',(req,res)=>{
  res.render('pages/form',{ title: 'Listado de Productos'})
})

app.post('/products', async (req,res)=>{  //funca
  let {body} = req;
  let saveProduct = container.save(body)
  
  res.redirect('/products')
})