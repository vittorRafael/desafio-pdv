const express = require('express')
const { listarCategorias } = require('./controladores/categoria')
const { cadastrarUsuario, login, detalharUsuario } = require('./controladores/usuario')
const rotas = express()

rotas.get('/categoria', listarCategorias )
rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)
rotas.get('/usuario', detalharUsuario)

module.exports = rotas
