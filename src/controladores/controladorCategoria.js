const repositorioCategoria = require('../repositorio/repositorioCategoria');


const controladorCategoria = {
    listarCategorias: async (req, res) => {
        try {
            const categorias = await repositorioCategoria.listarCategorias();
            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

module.exports = controladorCategoria;