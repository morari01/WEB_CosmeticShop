const express = require('express');
const router = express.Router();

const producerApiController = require('../../api/ProducerAPI');

router.get('/', producerApiController.getProducers);
router.get('/:id_producent', producerApiController.getProducerById);
router.post('/', producerApiController.createProducer);
router.put('/:id_producent', producerApiController.updateProducer);
router.delete('/:id_producent', producerApiController.deleteProducer);

module.exports = router;