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


exports.addSupplier = async (req, res) => {
    const {supplierName,contactNumber} = req.body;
    if(!supplierName || !contactNumber){
        return res.status(400).send('Please enter all the required fields.');
    }
    try {
        const result = await pool.query(
            `INSERT INTO suppliers (supplierName,contactNumber)
                VALUES (?, ?)`,[supplierName,contactNumber]
        )
        return res.status(200).json({success: true})
    }catch(err){
        return res.status(500).json({success:false,
            error:err.message});
    }
}



exports.getAllSuppliers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM suppliers`
        )
        return res.status(200).json({result: result[0]})
    }catch (err) {
        return res.status(500).json({success:false,
        error:err.message});

    }
}


exports.updateSupplier = async (req, res) => {
    const id = req.params.id;
    const { supplierName, contactNumber } = req.body;

    if (supplierName === undefined && contactNumber === undefined) {
        return res.status(400).send('Please enter at least one field to update.');
    }

    try {
        const [result] = await pool.query(
            `UPDATE suppliers
             SET supplierName = COALESCE(?, supplierName),
                 contactNumber = COALESCE(?, contactNumber)
             WHERE id = ?`,
            [supplierName ?? null, contactNumber ?? null, id]
        );

        const [supplier] = await pool.query(
            `SELECT * FROM suppliers WHERE id = ?`,
            [id]
        );

        if (supplier.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found.'
            });
        }

        return res.status(200).json({
            success: true,
            result: supplier[0]
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};



exports.deleteSupplier = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query(
            `DELETE FROM suppliers WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Supplier deleted successfully.'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
