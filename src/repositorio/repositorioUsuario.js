const knex = require('../config/configBancoDeDados');

const repositorioUsuario = {
    cadastrarUsuario: async (usuario) => {
        try {
            const usuarioCadastrado = await knex('usuarios').insert(usuario);
        } catch (error) {
            throw error;
        }
    },
    encontrarUsuario: async (emailOuId) => {
        try {
            if (isNaN(emailOuId)) {
                const usuario = await knex('usuarios').select('*').where('email', emailOuId);
                return usuario;
            } else {
                const usuario = await knex('usuarios').select('*').where('id', emailOuId);
                return usuario;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = repositorioUsuario