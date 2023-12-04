const repositorioUsuario = require('../repositorio/repositorioUsuario');
const jwt = require('jsonwebtoken');


const intermediarioValidarTokenUsuario = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
    try {
        const token = authorization.split(' ')[1];

        const usuarioLogado = await jwt.verify(token, process.env.JWT_PASS);
        const usuarioEncontrado = await repositorioUsuario.encontrarUsuario(usuarioLogado.id.id);
        req.usuarioEncontrado = usuarioEncontrado[0];
        return next();
    } catch (error) {
        console.log(error);
        if (error.message === 'jwt expired') {
            return res.status(400).json('Sua sessão terminou, por favor efetue novamente seu login.')
        }
        if (error.message === 'jwt must be provided') {
            return res.status(400).json('Para acessar este recurso um token de autenticação necessário deve ser enviado.')
        }
        return res.status(500).json(error.message)
    }
}

module.exports = intermediarioValidarTokenUsuario