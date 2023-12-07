const repositorioCliente = require('../repositorio/repositorioCliente')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body
    try{
        const cliente = {
            nome,
            email,
            cpf
        } 

        const clienteCadastrado = await repositorioCliente.cadastrarCliente(cliente)
        return res.status(200).json({
            id: clienteCadastrado[0].id,
            nome: clienteCadastrado[0].nome,
            email: clienteCadastrado[0].email
        }) 
        
    } catch(error){
        if(error.code === '23505'){
            if (error.constraint === 'clientes_email_key') {
                return res.status(404).json("Email fornecido já cadastrado!");
            }

            if(error.constraint === 'clientes_cpf_key'){
                return res.status(404).json("CPF fornecido já cadastrado!");
            }
        }
        res.status(400).json(error.message)
    }
}

const atualizarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params

    if((await repositorioCliente.buscarIdCliente(id)).length < 1){
        return res.status(404).json('O ID do cliente fornecido não existe.')
    }
    
    try{
        
        const cliente = {
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }

        const atualizacaoCliente = (await repositorioCliente.alterarCadastroCliente(id, cliente))[0]

        return res.status(200).json({
            id: atualizacaoCliente.id,
            nome: atualizacaoCliente.nome,
            email: atualizacaoCliente.email,
            cpf: atualizacaoCliente.cpf,
            ...repositorioCliente.condicionalExibicaoCliente(atualizacaoCliente, 'rua'),
            ...repositorioCliente.condicionalExibicaoCliente(atualizacaoCliente, 'cep'),
            ...repositorioCliente.condicionalExibicaoCliente(atualizacaoCliente, 'numero'),
            ...repositorioCliente.condicionalExibicaoCliente(atualizacaoCliente, 'bairro'),
            ...repositorioCliente.condicionalExibicaoCliente(atualizacaoCliente, 'cidade'),
            ...repositorioCliente.condicionalExibicaoCliente(atualizacaoCliente, 'estado')
          })

    } catch (error){
        if(error.code === '23505'){
            if (error.constraint === 'clientes_email_key') {
                return res.status(404).json("Email fornecido já cadastrado!");
            }

            if(error.constraint === 'clientes_cpf_key'){
                return res.status(404).json("CPF fornecido já cadastrado!");
            }
        }
        res.status(400).json(error.message)
    }
}

module.exports = {
    cadastrarCliente,
    atualizarCliente
}
