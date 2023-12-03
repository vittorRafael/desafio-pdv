const joi = require('joi');

const modeloUsuarioAtualizacao = joi.object({
    nome: joi.string()
        .alphanum(),
    email: joi.string()
        .email(),
    senha: joi.string()
});

module.exports = modeloUsuarioAtualizacao;