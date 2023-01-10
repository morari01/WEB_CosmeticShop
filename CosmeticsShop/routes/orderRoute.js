const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/', orderController.showOrderList);
router.get('/add', orderController.showAddOrderForm);
router.get('/details/:id', orderController.showOrderDetails);
router.get('/edit/:id', orderController.showEditOrder);

router.post('/add', orderController.addOrder);
router.post('/edit/', orderController.updateOrder);
router.get('/delete/:id', orderController.deleteOrder);

module.exports = router;