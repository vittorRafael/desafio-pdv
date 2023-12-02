const express = require('express');
const categorias = require('../controladores/categoria');
const usuarios = require('../controladores/usuario');
const rotas = express();

rotas.get('/categoria', categorias.listarCategorias);
rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

module.exports = rotas