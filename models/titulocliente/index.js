const mongoose = require('mongoose');

const TituloCliente = new mongoose.Schema({
    possuiTitulosVencidos: String,
    possuiTitulosAvencer: String,
    possuiTitulosPagos: String,
    TitulosVencidos :[
        {
            cdEmpresa: Number,
            cdFilial: Number,
            nrTitulo: Number,
            nrParcela: Number,
            dsEspecie: String,
            dtEmissao: String,
            dtVencimento: String,
            vlTitulo: Number,
            nrDiasEmAberto: Number,
        }
    ],
    TitulosAvencer:[
        {
            cdEmpresa: Number,
            cdFilial: Number,
            nrTitulo: Number,
            nrParcela: Number,
            dsEspecie: String,
            dtEmissao: String,
            dtVencimento: String,
            vlTitulo: Number,
        }
    ],
    TitulosPagos: [
        {
            cdEmpresa: Number,
            cdFilial: Number,
            nrTitulo: Number,
            nrParcela: Number,
            dsEspecie: String,
            dtEmissao: String,
            dtPagamento: String,
            vlTitulo: Number,
        }
    ]
})

module.exports = mongoose.model('TituloCliente', TituloCliente);