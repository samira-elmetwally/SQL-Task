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


exports.addCategory = async (req, res) => {
    try {
        const [existance] = await pool.query(
            "SHOW COLUMNS FROM products LIKE 'category'"
        );

        if (existance.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'Category column already exists.'
            });
        }

        await pool.query(`
            ALTER TABLE products
            ADD COLUMN category TEXT NULL
        `);

        return res.status(200).json({
            success: true,
            message: 'Category column added successfully.'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


exports.deleteCategory= async (req, res) => {
    try {

        const existance= await pool.query(`
        SHOW COLUMNS FROM products LIKE category`);
        if (existance.length > 0) {
            const result=await pool.query(`
            ALTER TABLE products
            DROP COLUMN category`)
                return res.status(200).json({success:true,
                message:'Table was deleted exists'});
;
        }
    }catch (err){
        return res.status(500).json({success:false,
            error:err.message
        });
    }
};


exports.updateCategory= async (req, res) => {
    try {
        const result =await pool.query(`
        ALTER TABLE suppliers
        MODIFY COLUMN contactNumber VARCHAR(15);`)
    }catch (err){
        return res.status(500).json({success:false,
        error:err.message});
    }
}




exports.addConstraint= async (req, res) => {
    try {
        const result =await pool.query(`
            ALTER TABLE products
            MODIFY COLUMN name VARCHAR(255) NOT NULL;`)
    }catch (err){
        return res.status(500).json({success:false,
            error:err.message});
    }
}