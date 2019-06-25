const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const GerarBoleto = new mongoose.Schema({
    link: String
})

module.exports = mongoose.model('GerarBoleto', GerarBoleto)