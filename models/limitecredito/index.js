const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const LimiteCredito = new mongoose.Schema({
    limiteAprovado: Number,
    classeRisco: Number,
    possuiTitulosVencidos: String,
    totalTitulosVencidos: Number,
    totalTitulosAVencer: Number,
    totalPedidosFuturos: Number,
    possuiCreditoDisponivel: String
})

module.exports = mongoose.model('LimiteCredito', LimiteCredito)