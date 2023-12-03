const joi = require('joi');

const modeloUsuario = joi.object({
    nome: joi.string()
        .alphanum()
        .required(),
    email: joi.string()
        .email()
        .required(),
    senha: joi.string()
        .required()
});

module.exports = modeloUsuario;