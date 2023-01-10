const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.showProductList);
router.get('/add', productController.showAddProductForm);
router.get('/details/:id_produkt', productController.showProductDetails);
router.get('/edit/:id_produkt', productController.showEditProductForm);

router.post('/add', productController.addProduct);
router.post('/edit/', productController.updateProduct);
router.get('/delete/:id_produkt', productController.deleteProduct);

module.exports = router;

