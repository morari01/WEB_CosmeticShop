const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message = `Pole jest wymagane`;
                break;
            case "string.min":
                err.message = `Pole musi mieć co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi mieć co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.base":
                err.message = `Pole musi byc typu number`;
                break;
            case "number.min":
                err.message = `Pole powinno byc większe od ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `Pole powinno byc mniejsze od ${err.local.limit}`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const errMessageNumber = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "number.empty":
                err.message = `Pole jest wymagane`;
                break;
            case "number.min":
                err.message = `Pole powinno byc większe od ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `Pole powinno byc mniejsze od ${err.local.limit}`;
                break;
            case "number.base":
                err.message = `Pole musi byc typu number`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const productSchema = Joi.object({
    id_produkt: Joi.number()
        .optional()
        .allow(""),
    Nazwa: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessage),
    Typ_produktu: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessage),
    Pojemnosc: Joi.number()
        .min(1)
        .required()
        .error(errMessageNumber),
    Cena: Joi.number()
        .min(1)
        .required()
        .error(errMessage),
    Opis: Joi.string()
        .max(100)
        .optional()
        .allow("")
        .error(errMessage)
});

module.exports = productSchema;
