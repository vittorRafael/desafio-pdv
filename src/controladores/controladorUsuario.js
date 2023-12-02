const repositorioUsuario = require('../repositorio/repositorioUsuario');
const bcrypt = require('bcrypt');
const senhaHash = require('../seguranca/senha_hash');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = {
            nome,
            email,
            senha: senhaCriptografada
        }
        await repositorioUsuario.cadastrarUsuario(usuario)
        return res.status(200).json("Usuário cadastrado com sucesso!")
    } catch (error) {
        if (error.code === '23505') {
            return res.status(404).json("Email fornecido já cadastrado!")
        }
        return res.status(400).json(error.message)
    }
}

const login = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.usuarioEncontrado }, senhaHash, { expiresIn: '8h' });
        return res.status(201).json({
            usuario: {
                nome: req.usuarioEncontrado.nome, token
            }
        });

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    cadastrarUsuario,
    login
}