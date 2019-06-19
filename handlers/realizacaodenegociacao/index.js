const repository = require('../../repository/titulosnegociados')
const RealizacaoDeNegociacao = require('../../models/realizacaodanegociacao')
const User = require('../../models/user')
const router = require('express').Router()
const mongoose = require('mongoose')
// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.post('/', (req, res, next) => {
    const {
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
        nrDiasEmAbertoLst,
        cdUnb,
        cdCliente
    } = req.body

    const user = User.find({ cdUnb: cdUnb, cdCliente: cdCliente }, function (err, users) {
        if (err) console.error(err)
        if (users[0] === undefined) {
            return res.status(500).json({ msg: "User not found!" })
        }
        if (cdUnb === users[0].cdUnb && cdCliente === users[0].cdCliente) {
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
                nrDiasEmAbertoLst,
                cdUnb: users[0].cdUnb,
                cdCliente: users[0].cdCliente
            })
            negociacaoData.save()
                .then(negociacaoDataSaved => {
                    return res.status(201).json(negociacaoDataSaved)
                })
                .catch(err => {
                    return res.status(500).json({msg: "Cannot save negotiation"})
                })
        } else {
            return res.status(500).json({ msg: "User not found!" })
        }

    })
})

module.exports = router