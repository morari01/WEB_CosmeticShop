const ProductRepository = require('../repository/mysql2/ProductRepository')

exports.showProductList = (req, res, next) => {
    ProductRepository.getProducts()
        .then(products => {
            res.render('pages/product/list', {
                products: products,
                navLocation: 'product'
            });
        });
}

exports.showAddProductForm = (req, res, next) => {
    res.render('pages/product/form', {
        product: [],
        pageTitle: 'Nowy produkt',
        formMode: 'createNew',
        btnLabel : 'Dodaj produkt',
        formAction: '/products/add',
        navLocation: 'product',
        validationErrors: []
    });
}

exports.showEditProductForm = (req, res, next) => {
    const prodId = req.params.id_produkt;
    ProductRepository.getProductById(prodId)
        .then(product => {
            res.render('pages/product/form', {
                product: product,
                formMode: 'edit',
                pageTitle: 'Edycja produktu',
                btnLabel : 'Edytuj produkt',
                formAction: '/products/edit',
                navLocation: 'product',
                validationErrors: []
            });
        })
}

exports.showProductDetails = (req, res, next) => {
    const prodId = req.params.id_produkt;
    ProductRepository.getProductById(prodId)
        .then(product => {
            res.render('pages/product/details', {
                product: product,
                formMode: 'showDetails',
                pageTitle: 'Szczegoly produktu',
                formAction: '',
                navLocation: 'product',
                validationErrors: []
            });
        })
}

exports.deleteProduct = (req,res,next) => {
    const prodId = req.params.id_produkt;
    ProductRepository.deleteProduct(prodId)
        .then(() => {
            res.redirect('/products');
        });
}

exports.updateProduct = (req,res,next) => {
    const prodId = req.body.id_produkt;
    const prodData = {...req.body};
    console.log(prodData, prodId)
    ProductRepository.updateProduct(prodId, prodData)
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
            res.render('pages/product/form', {
                product : prodData,
                pageTitle: 'Edycja produktu',
                formMode: 'createNew',
                btnLabel : 'Edytuj produkt',
                formAction: '/products/edit',
                navLocation: 'product',
                validationErrors: err.details
            });
        })
}

exports.addProduct = (req,res,next) => {
    const product = {...req.body}; //tworzy nowy obiekt data - kopia z req.body
    ProductRepository.createProduct(product)
        .then( result => {
            res.redirect('/products');
        })
        .catch(err => {
            res.render('pages/product/form', {
                product : product,
                pageTitle: 'Dodawanie produktu',
                formMode: 'createNew',
                btnLabel : 'Dodaj produkt',
                formAction: '/products/add',
                navLocation: 'product',
                validationErrors: err.details
            });
        })
}