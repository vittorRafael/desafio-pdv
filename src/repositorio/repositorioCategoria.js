const knex = require('../config/configBancoDeDados');

const repositorioCategoria = {
    listarCategorias: async function () {
        const categorias = await knex('categorias').select('*');
        return categorias;
    }
}

module.exports = repositorioCategoria;