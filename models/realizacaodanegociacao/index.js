const mongoose = require('mongoose')

const RealizacaoDaNegociacao = new mongoose.Schema({
    message: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('RealizacaoDaNegociacao', RealizacaoDaNegociacao)