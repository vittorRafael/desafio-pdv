const joi = require('joi');

const modeloCliente = joi.object({
    nome: joi.string()
        .required(),
    email: joi.string()
        .email()
        .required(),
    cpf: joi.string()
        .required(),
    cep: joi.string(),
    rua: joi.string(),
    numero: joi.string(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()
})


module.exports = modeloCliente