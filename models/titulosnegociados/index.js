const mongoose = require('mongoose')

const TitulosNegociados = new mongoose.Schema({
         nrAcao:Number,
          prJuros:Number,
          prMulta:Number,
          vlTotalNegociacao:Number,
          dsFormaNegociacao:String,
          tpFrequenciaPagto:Number,
          Boleto: {
            nrParcela:Number,
            vlBoleto:Number,
            dtVencBoleto:String,
            stBoleto:Number,
            cdBarraBoleto:Number,
            dsStBoleto:String,
            link:String
          }
})

module.exports = mongoose.model('TitulosNegociados', TitulosNegociados)