const knex = require('../config/configBancoDeDados')

const listarCategorias = async (req, res) => {
    try {
        const categorias = await knex('categorias').select('*')
        return res.status(200).json(categorias)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = { listarCategorias }