const knex = require('../config/configBancoDeDados');

const repositorioUsuario = {
    cadastrarUsuario: async (usuario) => {
        try {
            const usuarioCadastrado = await knex('usuarios').insert(usuario);
        } catch (error) {
            throw error;
        }
    },
    encontrarUsuario: async (email) => {
        try {
            const usuario = await knex('usuarios').select('*').where('email', email);
            return usuario;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = repositorioUsuario