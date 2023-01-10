const OrderRepository = require('../repository/mysql2/OrderRepository');

exports.getOrders = (req, res, next) => {
    OrderRepository.getOrders()
        .then(Orders => {
            res.status(200).json(Orders);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrderById = (req, res, next) => {
    const OrderId = req.params.id;
    OrderRepository.getOrderById(OrderId)
        .then(order => {
            if(!order){
                res.status(404).json({
                    message : 'Order with id: '+OrderId+' not found'
                })

            } else {
                res.status(200).json(order);
            }
        });
};

exports.createOrder = (req,res,next) => {
    OrderRepository.createOrder(req.body)
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

exports.updateOrder = (req,res,next) => {
    const OrderId = req.params.id;
    OrderRepository.updateOrder(OrderId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Order updated!', order: result });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOrder = (req,res,next) => {
    const OrderId = req.params.id;
    OrderRepository.deleteOrder(OrderId)
        .then(result => {
            res.status(200).json({message:'Removed', order: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};