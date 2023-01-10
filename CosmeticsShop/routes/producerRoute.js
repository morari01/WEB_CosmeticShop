const express = require('express');
const router = express.Router();

const producerController = require('../controllers/producerController');


router.get('/', producerController.showProducerList);
router.get('/add', producerController.showAddProducerForm);
router.get('/details/:id_producent', producerController.showProducerDetails);
router.get('/edit/:id_producent', producerController.showEditProducerForm);


router.post('/add', producerController.addProducer);
router.post('/edit/', producerController.updateProducer);
router.get('/delete/:id_producent', producerController.deleteProducer);

module.exports = router;