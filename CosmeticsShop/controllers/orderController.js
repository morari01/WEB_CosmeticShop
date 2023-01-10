const OrderRepository = require('../repository/mysql2/OrderRepository')
const ProductRepository = require('../repository/mysql2/ProductRepository')
const ProducerRepository = require('../repository/mysql2/ProducerRepository')

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            //console.log("---ALL ORDERS---")
           // console.log(orders)
            res.render('pages/order/list', {
                orders: orders,
                navLocation: 'order'
            });
        })
}

exports.showAddOrderForm = (req, res, next) => {
    let allProducts, AllProducers, allOrders;
    OrderRepository.getOrders()
        .then(orders => {
            allOrders = orders;
            return ProducerRepository.getProducers();
        })
        .then(producer => {
            AllProducers = producer;
            return ProductRepository.getProducts();
        })
        .then(product => {
            allProducts = product;
            res.render('pages/order/form', {
                order: [],
                navLocation: 'order',
                allProducts: allProducts,
                AllProducers: AllProducers,
                pageTitle: 'Nowe zamowienie',
                btnLabel: 'Dodaj zamowienie',
                formAction: '/orders/add',
                formMode: 'createNew',
                validationErrors: []
            });
        });
}

exports.showOrderDetails = (req, res, next) => {
    const orderId = req.params.id;
    OrderRepository.getOrderById(orderId)
        .then(order => {
            console.log("oder details", orderId);
            res.render('pages/order/details', {
                navLocation: 'order',
                order: order,
                pageTitle:'Szczegoly zamowienia',
                formMode: 'showDetails',
                formAction: '',
                validationErrors: []
            });
        })
}

exports.showEditOrder = (req, res, next) => {
    const orderId = req.params.id;
    console.log("showEditOrder", orderId)
    let allProducts, AllProducers, order;
    OrderRepository.getOrderById(orderId)
        .then(orders => {
            order = orders;
            return ProductRepository.getProducts();
        })
        .then(product => {
            allProducts = product;
            return ProducerRepository.getProducers();
        })
        .then(producer => {
            AllProducers = producer;
            res.render('pages/order/form', {
                order: {},
                order: order,
                AllProducers: AllProducers,
                allProducts: allProducts,
                pageTitle: 'Edycja zamowienia',
                btnLabel: 'Edytuj zamowienie',
                formAction: '/orders/edit',
                navLocation: 'order',
                formMode: 'edit',
                validationErrors: []
            });
           // console.log(order)
        })
}

exports.addOrder = (req, res, next) => {
    const order = {...req.body};
    let allProducts, AllProducers;
    OrderRepository.createOrder(order)
        .then(obj => {
            res.redirect('/orders');
        })
        .catch(err => {
             ProducerRepository.getProducers()
                .then(producer => {
                    AllProducers = producer;
                    return ProductRepository.getProducts();
                })
                .then(product => {
                    allProducts = product;
                    res.render('pages/order/form', {
                        order: order,
                        navLocation: 'order',
                        allProducts: allProducts,
                        AllProducers: AllProducers,
                        pageTitle: 'Nowe zamowienie',
                        btnLabel: 'Dodaj zamowienie',
                        formAction: '/orders/add',
                        formMode: 'createNew',
                        validationErrors: err.details
                    });
                });
            });
}

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;
    OrderRepository.deleteOrder(orderId)
        .then(order => {
            res.redirect('/orders');
        })
}

exports.updateOrder = (req, res, next) => {
    const orderId = req.body.id;
    const order = {...req.body};
    let allProducts, AllProducers
    OrderRepository.updateOrder(orderId, order )
        .then(obj => {
            res.redirect('/orders');
        })
        .catch(err => {
            ProducerRepository.getProducers()
                .then(producer => {
                    AllProducers = producer;
                    return ProductRepository.getProducts();
                })
                .then(product => {
                    allProducts = product;
                    res.render('pages/order/form', {
                        order: order,
                        navLocation: 'order',
                        allProducts: allProducts,
                        AllProducers: AllProducers,
                        pageTitle: 'Edycja zamowienia',
                        btnLabel: 'Edytuj zamowienie',
                        formAction: '/orders/edit',
                        formMode: 'createNew',
                        validationErrors: err.details
                    });
                });
        });
       /* .then(obj => {
            res.redirect('/orders');
        })
        .catch(err => {
            res.render('pages/order/form', {
                order: order,
                pageTitle: 'Edycja zamowienia',
                formMode: 'createNew',
                btnLabel : 'Edytuj zamowienie',
                formAction: '/orders/edit',
                navLocation: 'order',
                validationErrors: err.details
            });
        })*/
}