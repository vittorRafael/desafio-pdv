const express = require('express');

const controladorCategorias = require('../controladores/controladorCategoria');
const controladorUsuario = require('../controladores/controladorUsuario');

const middlewareValidacao = require('../intermediario/intermediarioValidacaoBodyGenrico');
const middlewareValidacaoAutenticacao = require('../intermediario/intermediarioValidarUsuarioExiste');

const modeloUsuario = require('../modelos/modeloValidacaoUsuario');
const intermediarioValidarTokenUsuario = require('../intermediario/intermediarioValidacaoTokenUsuarioLogin');


const rotas = express.Router();


rotas.get('/categoria', controladorCategorias.listarCategorias);
rotas.post('/usuario', middlewareValidacao.validarBodyRequisicao(modeloUsuario), controladorUsuario.cadastrarUsuario);
rotas.post('/login', middlewareValidacaoAutenticacao.validarUsuarioExiste, controladorUsuario.login);
rotas.use(intermediarioValidarTokenUsuario);
rotas.get('/usuario', controladorUsuario.detalharUsuario);
rotas.put('/usuario', controladorUsuario.atualizarUsuario)

module.exports = rotas;