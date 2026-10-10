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

exports.addSales = async (req, res) => {
    const { productID, quantitySold, saleDate } = req.body;

    if (
        productID == null ||
        quantitySold == null ||
        !saleDate
    ) {
        return res.status(400).send('Please enter all the required fields.');
    }

    if (
        !Number.isInteger(Number(productID)) ||
        Number(productID) <= 0 ||
        !Number.isInteger(Number(quantitySold)) ||
        Number(quantitySold) <= 0
    ) {
        return res.status(400).send('Invalid productID or quantitySold.');
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO sales (productID, quantitySold, saleDate)
             VALUES (?, ?, ?)`,
            [productID, quantitySold, saleDate]
        );

        return res.status(201).json({
            success: true,
            message: 'Sale recorded successfully.',
            saleID: result.insertId
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


exports.getAllSales = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM sales`
        );

        return res.status(200).json({
            success: true,
            result: result
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getSalesByProduct = async (req, res) => {
    const productID = req.params.productID;

    try {
        const [result] = await pool.query(
            `SELECT * FROM sales WHERE productID = ?`,
            [productID]
        );

        return res.status(200).json({
            success: true,
            result: result[0]
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};