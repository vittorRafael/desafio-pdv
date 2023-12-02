

const intermediarioValidacaoBodyGenrico = {
    validarBodyRequisicao: modeloJoiValidacao => async (req, res, next) => {
        try {
            await modeloJoiValidacao.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

module.exports = intermediarioValidacaoBodyGenrico