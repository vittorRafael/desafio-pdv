const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3000;;


app.use(express.json(), rotas);


app.listen(PORT, () =>
    console.log(`Servidor rodando na porta ${PORT}`)
)