const router = require('express').Router()
const GerarBoleto = require('../../models/gerarboleto') 
const TitulosNegociado  = require('../../models/titulosnegociados')

router.post('/',(req, res, next) => {

    const {
        cdUnb,
        cdCliente,
        link
    } = req.query

    const titulosnegociado  = TitulosNegociado.find({cdUnb: cdUnb, cdCliente: cdCliente}, function(err, titulosnegociados) {
        if(err) return console.log(err)
        if(titulosnegociados.length === 0) return res.status(500).json({msg: 'User not found or has no bills to pay'})
        const result = titulosnegociados.filter(titulo => titulo.Boleto.link === link)
        const gerarboleto = GerarBoleto({
            link
        })
        gerarboleto.save()
            .then(gerarboletoSaved => {
                return res.status(201).json(gerarboletoSaved)
            })
            .catch(err => {
                return res.status(501).json({msg: "Boleto não foi gerado"})
            })   
    })
})

module.exports = router