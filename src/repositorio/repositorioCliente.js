const knex = require('../config/configBancoDeDados');

const repositorioCliente = {
    cadastrarCliente: async (cliente) => {
        try {
            const clienteCadastrado = await knex('clientes').insert(cliente).returning('*')
            return clienteCadastrado;
        } catch (error){
            throw error
        }
    },
    buscarIdCliente: async (id) => {
        try{
            const clienteId = await knex('clientes').select('*').where('id', id)
            return clienteId
        } catch (error){
            throw error
        }
    },
    alterarCadastroCliente: async (idCliente, dadosCliente) => {
        try {
            const clienteParaAtualizar = (await repositorioCliente.buscarIdCliente(idCliente))[0]           
            const clienteAtualizado = await knex('clientes')
                .where('id', idCliente )
                .update({
                    nome: dadosCliente.nome ?? clienteParaAtualizar.nome,
                    email: dadosCliente.email ?? clienteParaAtualizar.email,
                    cpf: dadosCliente.cpf ?? clienteParaAtualizar.cpf,
                    cep: dadosCliente.cep ?? clienteParaAtualizar.cep,
                    rua: dadosCliente.rua ?? clienteParaAtualizar.rua,
                    numero: dadosCliente.numero ?? clienteParaAtualizar.numero,
                    bairro: dadosCliente.bairro ?? clienteParaAtualizar.bairro,
                    cidade: dadosCliente.cidade ?? clienteParaAtualizar.cidade,
                    estado: dadosCliente.estado ?? clienteParaAtualizar.estado
                })
                .returning('*')
            return clienteAtualizado
        } catch (error) {
            throw error;
        }  
    },
    condicionalExibicaoCliente: (objeto, chave) => {
        return objeto[chave] !== null ? { [chave]: objeto[chave] } : {}
    }
}

module.exports = repositorioCliente;