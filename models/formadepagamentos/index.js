const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const FormaPagamento = new mongoose.Schema({
    Parcelamento: [
        {
            idPeridodicidade: String,
            idEntrada: String,
            dsFormaParcelamento: String,
            Parcelas: mongoose.Schema.Types.Mixed
        }
    ]
})

module.exports = mongoose.model('FormaPagamento', FormaPagamento)