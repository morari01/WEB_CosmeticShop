const express = require('express');
const router = express.Router();

const orderApiController = require('../../api/OrderAPI');

router.get('/',orderApiController.getOrders);
router.get('/:id_order', orderApiController.getOrderById);
router.post('/', orderApiController.createOrder);
router.put('/:id_order', orderApiController.updateOrder);
router.delete('/:id_order', orderApiController.deleteOrder);


module.exports = router;