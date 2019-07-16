const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const InformacoesPrazo = new mongoose.Schema({
    prazoAtual: Number,
    prazoMaximo: Number,
    possuiTitulosVencidos: String,
    historico: [{
        dataAlteracao: String,
        prazoAlterado: Number,
        motivoAlteracao: String
    }]
})

module.exports = mongoose.model('InformacoesPrazo', InformacoesPrazo)