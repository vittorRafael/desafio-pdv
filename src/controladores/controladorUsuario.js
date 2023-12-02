const repositorioUsuario = require('../repositorio/repositorioUsuario');
const knex = require('../config/configBancoDeDados')
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
    const { senha: _, ...usuario } = req.usuario
    return res.status(200).json({ usuario })
};

const atualizarUsuario = async (req, res) => {
    let { nome, email, senha } = req.body;
    const { id } = req.usuario;

    if (!nome && !email && !senha) {
        return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
    }

    try {
        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json('Usuario não encontrado');
        }

        if (senha) {
            senha = await bcrypt.hash(senha, 10);
        }

        if (email !== req.usuario.email) {
            const emailUsuarioExiste = await knex('usuarios').where({ email }).first();

            if (emailUsuarioExiste) {
                return res.status(404).json('O Email já existe.');
            }
        }

        const usuarioAtualizado = await knex('usuarios')
            .where({ id })
            .update({
                nome,
                email,
                senha
            });

        if (!usuarioAtualizado) {
            return res.status(400).json("O usuario não foi atualizado");
        }

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