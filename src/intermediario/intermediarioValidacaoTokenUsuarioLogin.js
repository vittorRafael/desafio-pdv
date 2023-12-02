const knex = require('../config/configBancoDeDados');
const jwt = require('jsonwebtoken');
const senhaHash = require('../seguranca/senha_hash');

const intermediarioValidarTokenUsuario = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
    
    try {

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, senhaHash)
        
        const usuario = await knex('usuarios').select('*').where('id', id.id)

        req.usuario = usuario[0]
        
        next()
        
    } catch (error) {
        if ('jwt expired') {
            return res.status(400).json('Sua sessão terminou, por favor efetue novamente seu login.')
        }
        return res.status(500).json(error.message)
    }
}

module.exports = intermediarioValidarTokenUsuario