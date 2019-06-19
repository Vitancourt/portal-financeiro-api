const mongoose = require('mongoose')

const RealizacaoDaNegociacao = new mongoose.Schema({
    qtDiasInadimplencia: Number,
    dsEmail: String,
    tpNegociacao: Number,
    nrParcelas: Number,
    idPeriodicidade: String,
    idEntrada: String,
    nrTituloLst: Number,
    dtVencimentoLst: String,
    vlTituloLst: Number, 
    cdEmpresaLst: Number,
    cdFilialLst: Number,
    nrParcelaLst: Number,
    dtEmissaoLst: String,
    nrDiasEmAbertoLst: Number,
    cdUnb: Number,
    cdCliente: Number
})

module.exports = mongoose.model('RealizacaoDaNegociacao', RealizacaoDaNegociacao)