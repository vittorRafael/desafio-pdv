const express = require('express')
const rotas = require('./rotas')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())
server.use(rotas)

const porta = process.env.PORT || 3000

server.listen(porta, () => {
    console.log(`Conectado a porta ${porta}`)
})
