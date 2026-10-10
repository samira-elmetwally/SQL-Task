const express = require('express');
const app = express();
const mysql=require('mysql2/promise');
const PORT=5555;
const {
    addProduct,
    getAllProducts,
    getOneProducts,
    updateProduct,
    deleteProduct,
}=require('./controllers/products.controller.js');

const {
    addSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier,
}=require('./controllers/suppliers.controller.js');

const {
    addSales,
    getAllSales,
    getSalesByProduct,
}=require('./controllers/sales.controller.js');

const {
    addCategory,
    deleteCategory,
    updateCategory,
    addConstraint,
}=require('./controllers/tables.controller.js');
app.use(express.static('public'));
app.use(express.json());


//--------products--------
app.post('/products',addProduct);
app.get('/products',getAllProducts);
app.get('/products/:id',getOneProducts);
app.patch('/products/:id',updateProduct);
app.delete('/products/:id',deleteProduct);


//--------supplier--------
app.post('/suppliers', addSupplier);
app.get('/suppliers',getAllSuppliers);
app.patch('/suppliers/:id',updateSupplier);
app.delete('/suppliers/:id',deleteSupplier);


//--------sale--------
app.post('/sales',addSales);
app.get('/sales',getAllSales);
app.get('/sales/product/:productID',getSalesByProduct);


//----------tables--------
app.get('/tables',addCategory);
app.delete('/tables',deleteCategory);
app.patch('/tables',updateCategory);
app.post('/tables/addConstraint',addConstraint);






app.listen(PORT, () => {
    `listening on port ${PORT}`
})

