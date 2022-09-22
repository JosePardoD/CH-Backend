const express = require('express');
/*const { Router } = express; */
const app = express();
const routerProductos = express.Router();
const routerCarrito =express.Router();

const contenedor = require('./Contenedor.js')
const containerProductos = new contenedor('productos')
const contenedor2 = require('./Contenedor2.js')
const containerCarrito = new contenedor2('carrito')



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use('/public', express.static(__dirname + '/public')); */


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);




/* PRODUCTS*/

/* GET Listado de productos  =>  /api/productos  */

routerProductos.get('/', async (req, res) => { 
    const products = await containerProductos.getAll()
    res.json(products);
    console.log("ENTRO");
  });
  
/* GET Producto Especifico del listado  =>  /api/productos/:id  */
routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await containerProductos.getById(id);

    res.json(product);
})

/* POST  Producto Especifico del listado  =>  /api/productos/:id  */

routerProductos.post('/', async(req, res) => {
  const { body } = req;
  body.timestamp=Date.now();
 
  console.log(body);

  const productoGenerado = await containerProductos.save(body);
  
  res.json({ success: 'ok', new: productoGenerado });
});

/* Put  Actualizar Producto Especifico del listado  =>  /api/productos/:id  */
routerProductos.put('/:id', async(req, res) => {
  let { id } = req.params;
  const { body } = req;


  body.timestamp=Date.now();

  const changedProduct = await containerProductos.updateOne(id, body);
  res.json({ success: 'ok', new:changedProduct });

});

/* Delete  Actualizar Producto Especifico del listado  =>  /api/productos/:id  */


routerCarrito.post('/', async(req, res) => {
  const { body } = req;
  body.timestamp=Date.now();
  const carritoGenerado = await containerCarrito.save(body);
  
  res.json({ success: 'ok', new: carritoGenerado });
});


routerCarrito.get('/:id/productos', async (req, res) => {
  const { id } = req.params;
  const carrito = await containerCarrito.getById(id);
  res.json(carrito);
})

routerCarrito.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const carritoDelete = await containerCarrito.deleteObject(id);
  res.json({ success:'ok',new:  carritoDelete});
});

