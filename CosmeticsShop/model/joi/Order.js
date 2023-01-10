const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole musi mieć co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi mieć co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.min":
                err.message = `Pole powinno mieć wartosc minimum ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `Pole powinno mieć wartosc maksimum ${err.local.limit}`;
                break;
            case "number.base":
                err.message = `Pole powinno byc typu number`;
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
            case "number.min":
                err.message = "Pole nie może być: --Wybierz--";
                break;
            default:
                break;
        }
    });
    return errors;
}

const errDateMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "date.empty":
                err.message = "Pole jest wymagane";
                break;
            case "date.base":
                err.message = "Pole powinno byc date";
                break;
            default:
                break;
        }
    });
    return errors;
}

const orderSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    id_produkt: Joi.number()
        .min(0)
        .required()
        .error(errMessageNumber),
    id_producent: Joi.number()
        .min(0)
        .required()
        .error(errMessageNumber),
    Ilosc: Joi.number()
        .min(1)
        .max(1000)
        .required()
        .error(errMessage),
    Data_dostawy: Joi.date()
        .required()
        .greater("now")
        .message("Data nie moze byc mniejsza od dzisiaj")
        .error(errDateMessage),
    Komentarz: Joi.string()
        .max(50)
        .optional()
        .allow("")
});

module.exports = orderSchema;
