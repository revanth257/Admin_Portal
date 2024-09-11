// productController.js
const db = require('../models/db');

exports.getAllProductsCategory = (req, res) => {
    db.query('SELECT * FROM product_category', (err, results) => {
        if (err) {
            console.error('Error fetching products: ', err);
            res.status(500).send('Error fetching products');
            return;
        }
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: results,
            message: "Product Category data fetch successfully"
        });
    });
};

exports.createProductCategory = (req, res) => {
    const { name, desc } = req.body;
    db.query('INSERT INTO product_category (pc_name, pc_descr) VALUES (?, ?)', [name, desc], (err, results) => {
        if (err) {
            console.error('Error creating product: ', err);
            res.status(500).send('Error creating product');
            return;
        }
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: "Product created successfully"
        });
    });
};

exports.deleteProductCategory = (req, res) => {
    const { id } = req.params;
    db.query('delete FROM product_category where pc_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error Delete product: ', err);
            res.status(500).send('Error Delete product');
            return;
        }
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: "Product Deleted successfully"
        });
    });
};