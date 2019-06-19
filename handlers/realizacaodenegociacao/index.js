const repository = require('../../repository/titulosnegociados')
const RealizacaoDeNegociacao = require('../../models/realizacaodanegociacao')
const logger = require('morgan')
const router = require('express').Router()


// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.post('/', (req, res, next) => {
    console.log(req.body)
    const [
        qtDiasInadimplencia, 
        dsEmail, 
        tpNegociacao, 
        nrParcelas,
        idPeriodicidade,
        idEntrada,
        nrTituloLst,
        dtVencimentoLst,
        vlTituloLst, 
        cdEmpresaLst,
        cdFilialLst,
        nrParcelaLst,
        dtEmissaoLst,
        nrDiasEmAbertoLst
    ] = req.body

    const negociacaoData = new RealizacaoDeNegociacao({
        qtDiasInadimplencia,
        dsEmail,
        tpNegociacao,
        nrParcelas,
        idPeriodicidade,
        idEntrada,
        nrTituloLst,
        dtVencimentoLst,
        vlTituloLst, 
        cdEmpresaLst,
        cdFilialLst,
        nrParcelaLst,
        dtEmissaoLst,
        nrDiasEmAbertoLst
    })
    negociacaoData.save()
        .then(negociacaoDataSaved => {
            return res.status(201).json(negociacaoDataSaved)
        })
        .catch(err => {
            return res.status(500).json({msg: "Cannot save negotiation"})
        })
})

module.exports = router