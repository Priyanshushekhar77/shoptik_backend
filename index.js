const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');

const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');

server.use(express.json());
server.use('/products', productsRouter.router);
// we can also use JWT token for client-only auth
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);

main().catch(err=> console.log(err))


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/shoptik');
    console.log('database connected')
}

server.get('/',(req,res) => {
    res.json({status:'success'})
})
server.post('/products',createProduct)
server.listen(8000,() => {
    console.log('server started')
})