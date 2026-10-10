const express = require('express');
const app = express();
const mysql=require('mysql2/promise');
app.use(express.static('public'));
app.use(express.json());

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sqltask'
});


exports.addProduct= async (req, res) => {
    const {name,price,quantity,supplierID}=req.body;
    if(    name == null || name === '' ||
        price == null ||
        quantity == null ||
        supplierID == null){
        return res.status(400).send('Please enter all the required fields.');
    }
    try {
        const [result] = await pool.query(
            `INSERT INTO products (name, price, quantity, supplierID)
     VALUES (?, ?, ?, ?)`,
            [name, price, quantity, supplierID]
        );
        return res.status(201).json({
            success: true,
        });
    }catch (err){
        return res.status(500).json({success:false,
            error:err.message});
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM products`,
        );
        return res.status(200).json({success:true,
            result:result[0]});

    }catch (err){
        return res.status(500).json({success:false,
        error:err.message});
    }
}

exports.getOneProducts=async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            `SELECT * FROM products WHERE id=${id}`,
        )
        return res.status(200).json({success:true,result:result[0]});
    }catch (err){
        return res.status(500).json({success:false,
            error:err.message});
    }
};

exports.updateProduct= async (req, res) => {
    const id = req.params.id;
    const {name,price,quantity,supplierID}=req.body;

    if (
        name === undefined &&
        price === undefined &&
        quantity === undefined &&
        supplierID === undefined
    ){
        return res.status(400).send('Please enter at least one of the required fields.');
    }


    try {
        const [result]=await pool.query(
            `UPDATE products
             SET name = COALESCE(?, name),
                 price = COALESCE(?, price),
                 quantity = COALESCE(?, quantity),
                 supplierID = COALESCE(?, supplierID)
            WHERE id=?`,
            [name ?? null, price ?? null, quantity ?? null, supplierID ?? null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        const product=await pool.query(
            `select * from products where id=?`,
            [id]
        )
        return res.status(200).json({success:true,result:product[0]});

    }catch (err){
        return res.status(500).json({success:false,error:err.message});
    }
}


exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {

        const [result] = await pool.query(
            `DELETE FROM products WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }



        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully.'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};



