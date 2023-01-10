const ProducerRepository = require('../repository/mysql2/ProducerRepository')

exports.showProducerList = (req, res, next) => {
    ProducerRepository.getProducers()
        .then(producers => {
            res.render('pages/producer/list', {
                producers: producers,
                navLocation: 'producer'
            });
        });
}

exports.showAddProducerForm = (req, res, next) => {
    res.render('pages/producer/form', {
        producer: [],
        pageTitle: 'Nowy producent',
        formMode: 'createNew',
        btnLabel : 'Dodaj producenta',
        formAction: '/producers/add',
        navLocation: 'producer',
        validationErrors: []
    });
}

exports.showEditProducerForm = (req, res, next) => {
    const producerId = req.params.id_producent;
    ProducerRepository.getProducerById(producerId)
        .then(producer => {
            res.render('pages/producer/form', {
                producer: producer,
                formMode: 'edit',
                pageTitle: 'Edycja producenta',
                btnLabel : 'Edytuj producenta',
                formAction: '/producers/edit',
                navLocation: 'producer',
                validationErrors: []
            });
        })
}

exports.showProducerDetails = (req, res, next) => {
    const producerId = req.params.id_producent;
    ProducerRepository.getProducerById(producerId)
        .then(producer => {
            res.render('pages/producer/details', {
                producer: producer,
                formMode: 'showDetails',
                pageTitle: 'Szczegoly producenta',
                formAction: '',
                navLocation: 'producer',
                validationErrors: []
            });
        })
}

exports.deleteProducer = (req,res,next) => {
    const prodId = req.params.id_producent;
    ProducerRepository.deleteProducer(prodId)
        .then( () => {
            res.redirect('/producers');
        });
}

exports.updateProducer = (req,res,next) => {
    const prodId = req.body.id_producent;
    const prodData = {...req.body};
    ProducerRepository.updateProducer(prodId, prodData)
        .then( result => {
            res.redirect('/producers');
        })
        .catch(err => {
        res.render('pages/producer/form', {
            producer : prodData,
            pageTitle: 'Edycja producenta',
            formMode: 'createNew',
            btnLabel : 'Edytuj producenta',
            formAction: '/producers/edit',
            navLocation: 'producer',
            validationErrors: err.details
        });
    })
}

exports.addProducer = (req,res,next) => {
    const producer = {...req.body}; //tworzy nowy obiekt data - kopia z req.body
    ProducerRepository.createProducer(producer)
        .then( result => {
            res.redirect('/producers');
        })
        .catch(err => {
        res.render('pages/producer/form', {
            producer : producer,
            pageTitle: 'Dodawanie producentu',
            formMode: 'createNew',
            btnLabel : 'Dodaj producenta',
            formAction: '/producers/add',
            navLocation: 'producer',
            validationErrors: err.details
        });
    })
}