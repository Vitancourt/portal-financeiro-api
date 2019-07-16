const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const AvaliacaoDeCredito = new mongoose.Schema({
    possuiTitulosVencidos: String,
    classeRisco: Number,
    possuiPendencias: String,
    pendenciasBancarias: Number,
    pendenciasComerciais: Number,
    pendenciasJudiciais: Number,
    pendenciasComCheques: Number,
    percentualTitulosAtraso: String,
    quantidadeTitulosVencidos: Number,
    possuiDocumentacao: String,
    ultConsultaSerasa: String
})

module.exports = mongoose.model('AvaliacaoDeCredito', AvaliacaoDeCredito);