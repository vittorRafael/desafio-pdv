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
    },
    atualizarUsuario: async (idUsuarioParaAtualizar, dadosParaAtualizar) => {
        try {
            console.log(idUsuarioParaAtualizar);
            const usuarioParaAtualizar = await knex('usuarios').select('*').where('id', idUsuarioParaAtualizar);
            const usuarioAtualizado = await knex('usuarios')
                .where({ id: idUsuarioParaAtualizar })
                .update({
                    nome: dadosParaAtualizar.nome ?? usuarioParaAtualizar.nome,
                    email: dadosParaAtualizar.email ?? usuarioParaAtualizar.email,
                    senha: dadosParaAtualizar.senha ?? usuarioParaAtualizar.senha
                });
            return usuarioAtualizado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = repositorioUsuario