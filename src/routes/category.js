const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllProductsCategory);
router.post('/', categoryController.createProductCategory);
router.delete('/', categoryController.deleteProductCategory)


module.exports = router