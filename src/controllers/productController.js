// productController.js
const db = require('../models/db');

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM product_details pd left join product_category pc on pc.pc_id = pd.pc_id_fk', (err, results) => {
    if (err) {
      console.error('Error fetching products: ', err);
      res.status(500).send('Error fetching products');
      return;
    }
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: results,
      message: "Product data fetch successfully"
    });
  });
};

exports.createProduct = (req, res) => {
  const { name, type, price, pc_id } = req.body;
  db.query('INSERT INTO product_details (pname, ptype, pcost, pc_id_fk) VALUES (?, ?, ?, ?)', [name, type, price, parseInt(pc_id)], (err, results) => {
    if (err) {
      console.error('Error creating product: ', err);
      res.status(500).send('Error creating product');
      return;
    }
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: "Product create successfully"
    });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('delete FROM product_details where pc_id = ?', [id], (err, results) => {
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
