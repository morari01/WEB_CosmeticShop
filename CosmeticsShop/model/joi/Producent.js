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
            case "string.email":
                err.message = `Pole powinno zawierac poprawny adres email`;
                break;
            default:
                break;
        }
    });
    return errors;
}



const producerSchema = Joi.object({
    id_producent: Joi.number()
        .optional()
        .allow(""),
    Nazwa_firmy: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessage),
    Panstwo: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessage),
    Miasto: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessage),
    Telefon: Joi.string()
        .max(12)
        .pattern(/^[+]?\d+$/)
        .message("Pole powinno zawierac prawidlowy format telefonu")
        .required()
        .error(errMessage),
    Email: Joi.string()
        .email()
        .optional()
        .allow("")
        .max(100)
        .message("Pole powinno zawierac prawidlowy email")
});

module.exports = producerSchema;
