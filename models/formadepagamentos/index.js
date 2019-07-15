const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const FormaPagamento = new mongoose.Schema({
    idPeridodicidade: String,
    idEntrada: String,
    dsFormaParcelamento: mongoose.Schema.Types.Mixed,
    nrParcelas: Number,
    vlTotalParcelado: Number,
    vlPrimeiraParcela: Number,
    vlDemaisParcelas: Number,
    dtPrimeiroVenc: String
})

module.exports = mongoose.model('FormaPagamento', FormaPagamento)