const mongoose = require('mongoose')

const TitulosNegociado = new mongoose.Schema({
  nrAcao:Number,
  prJuros:Number,
  prMulta:Number,
  vlTotalNegociacao:Number,
  dsFormaNegociacao:String,
  tpFrequenciaPagto:Number,
  Boleto: mongoose.Schema.Types.Mixed,
  cdUnb: Number,
  cdCliente: Number
})

module.exports = mongoose.model('TitulosNegociado', TitulosNegociado)