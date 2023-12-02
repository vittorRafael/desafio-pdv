const knex = require('../config/configBancoDeDados');
const bcrypt = require('bcrypt');
const senhaHash = require('../seguranca/senha_hash');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        for (let validador of Object.keys({ nome, email, senha })) {
            if (!req.body[validador]) {
                return res.status(400).json(`É necessário que o campo ${validador} seja preenchido!`)
            }
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = {
            nome,
            email,
            senha: senhaCriptografada
        }

        await knex('usuarios').insert(usuario)

        return res.status(200).json("Usuário cadastrado com sucesso!")
    } catch (error) {
        if (error.code === '23505') {
            return res.status(404).json("Email fornecido já cadastrado!")
        }
        return res.status(400).json(error.message)
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {

        for (let validador of Object.keys({ email, senha })) {
            if (!req.body[validador]) {
                return res.status(400).json(`É necessário que o campo ${validador} seja preenchido!`)
            }
        }

        const usuario = await knex('usuarios').select('*').where('email', email)
        if (usuario.length === 0) {
            return res.status(400).json("Email ou senha inválidos!")
        }

        const usuarioSelecionado = usuario[0]

        const validarSenha = await bcrypt.compare(senha, usuarioSelecionado.senha)
        if (!validarSenha) {
            return res.status(400).json("Email ou senha inválidos!")
        }

        const token = jwt.sign({ id: usuarioSelecionado.id }, senhaHash, { expiresIn: '8h' })

        return res.status(201).json({ usuario: {
            nome: usuarioSelecionado.nome, token }});

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    cadastrarUsuario,
    login
}