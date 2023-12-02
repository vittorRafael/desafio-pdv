const repositorioUsuario = require('../repositorio/repositorioUsuario');
const bcrypt = require('bcrypt');

const intermediarioValidarUsuarioExiste = {
    validarUsuarioExiste: async (req, res, next) => {
        const { senha, email } = req.body
        try {
            const usuarioEncontrado = await repositorioUsuario.encontrarUsuario(email);
            if (usuarioEncontrado.length === 0) {
                return res.status(400).json("Email ou senha inválidos!");
            }
            const validarSenha = await bcrypt.compare(senha, usuarioEncontrado[0].senha);
            if (!validarSenha) {
                return res.status(400).json("Email ou senha inválidos!");
            }
            req.usuarioEncontrado = usuarioEncontrado[0];
            next();
        } catch (error) {
            console.log(error);
            return res.status(400).json(error.message);
        }
    }
}

module.exports = intermediarioValidarUsuarioExiste;