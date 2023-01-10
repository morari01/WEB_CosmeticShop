const ProducerRepository = require('../repository/mysql2/ProducerRepository');

exports.getProducers = (req, res, next) => {
    ProducerRepository.getProducers()
        .then(producers => {
            res.status(200).json(producers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducerById = (req, res, next) => {
    const producerId = req.params.id_producent;
    ProducerRepository.getProducerById(producerId)
        .then(producer => {
            if(!producer){
                res.status(404).json({
                    message : 'Producer with id: '+producerId+' not found'
                })
            } else {
                res.status(200).json(producer);
            }
        });
};

exports.createProducer = (req,res,next) => {
    ProducerRepository.createProducer(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateProducer = (req,res,next) => {
    const producerId = req.params.id_producent;
    ProducerRepository.updateProducer(producerId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Product updated!', producer: result });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProducer = (req,res,next) => {
    const producerId = req.params.id_producent;
    ProducerRepository.deleteProducer(producerId)
        .then(result => {
            res.status(200).json({message:'Removed', producer: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};