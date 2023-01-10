const express = require('express');
const router = express.Router();

const prodApiController = require('../../api/ProductAPI');

router.get('/', prodApiController.getProducts);
router.get('/:id_produkt', prodApiController.getProductById);
router.post('/', prodApiController.createProduct);
router.put('/:id_produkt', prodApiController.updateProduct);
router.delete('/:id_produkt', prodApiController.deleteProduct);

module.exports = router;