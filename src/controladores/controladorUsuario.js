const repositorioUsuario = require('../repositorio/repositorioUsuario');
const knex = require('../config/configBancoDeDados')
const bcrypt = require('bcrypt');
const senhaHash = require('../seguranca/senha_hash');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuario = {
            nome,
            email,
            senha: senhaCriptografada
        };
        await repositorioUsuario.cadastrarUsuario(usuario);
        return res.status(200).json("Usuário cadastrado com sucesso!");
    } catch (error) {
        if (error.code === '23505') {
            return res.status(404).json("Email fornecido já cadastrado!");
        }
        return res.status(400).json(error.message);
    }
};

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
};

const detalharUsuario = async (req, res) => {
    try {
        const usuarioParaDetalhar = {
            id: req.usuarioEncontrado.id,
            nome: req.usuarioEncontrado.nome,
            email: req.usuarioEncontrado.email
        };
        return res.status(200).json(usuarioParaDetalhar);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        if (senha) {
            senha = await bcrypt.hash(senha, 10);
        }
        if (email !== req.usuarioEncontrado.email) {
            const emailUsuarioExiste = await repositorioUsuario.encontrarUsuario(email);
            if (emailUsuarioExiste.length > 0) {
                return res.status(400).json('O Email já existe.');
            }
        }
        const usuarioParaAtualizar = {
            nome,
            email,
            senha
        }
        await repositorioUsuario.atualizarUsuario(req.usuarioEncontrado.id, usuarioParaAtualizar);
        return res.status(200).json('Usuario foi atualizado com sucesso.');
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
};


module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
}