const ProductRepository = require('../repository/mysql2/ProductRepository');

exports.getProducts = (req, res, next) => {
    ProductRepository.getProducts()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProductById = (req, res, next) => {
    const productId = req.params.id_produkt;
    ProductRepository.getProductById(productId)
        .then(product => {
            if(!product){
                res.status(404).json({
                    message : 'Product with id: '+productId+' not found'
                })
            } else {
                res.status(200).json(product);
            }
        });
};

exports.createProduct = (req,res,next) => {
    ProductRepository.createProduct(req.body)
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

exports.updateProduct = (req,res,next) => {
    const productId = req.params.id_produkt;
    ProductRepository.updateProduct(productId, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Product updated!', product: result });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProduct = (req,res,next) => {
    const productId = req.params.id_produkt;
    ProductRepository.deleteProduct(productId)
        .then(result => {
            res.status(200).json({message:'Removed', product: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};