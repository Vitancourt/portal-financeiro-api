const AvaliacaoDeCredito = require('../../models/avaliacaocredito')
const dateFormat = require('dateformat')
const Random = require('../../helper/random')
const router = require('express').Router()
const User = require('../../models/user')

// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.get('/', (req, res, next) => {
    
    if (parseInt(req.query.ppopcao) !== 55 || parseInt(req.query.requisicao) !== 86 || parseInt(req.query.opcao) !== 10)
        return res.status(500)

    const cdUnb = parseInt(req.query.cdUnb)
    const cdCliente= parseInt(req.query.cdCliente)

    const percentualTitulosAtraso = [
        "NENHUM",
        "BAIXO",
        "MÉDIO",
        "ALTO"
    ]

    const user = User.find({cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users) {
        if(err) return console.log(err)
        if(users[0] === undefined) return res.status(500).json({msg: "User not found"})
        if(cdUnb === users[0].cdUnb && cdCliente === users[0].cdCliente) {
            let titulosVencidos = (Random.number(1,101) % 2 === 0) ? "S":"N"
            let possuiPendencias = (Random.number(1, 101) % 2 === 0) ? "S" : "N"
            let avaliacaocredito = AvaliacaoDeCredito({
                possuiTitulosVencidos: titulosVencidos,
                classeRisco: Random.number(1, 6),
                possuiPendencias: possuiPendencias,
                pendenciasBancarias: possuiPendencias === "S" ? Random.number(0, 999999999) : 0,
                pendenciasComerciais: possuiPendencias === "S" ? Random.number(0, 999999999) : 0,
                pendenciasJudiciais: possuiPendencias === "S" ? Random.number(0, 999999999) : 0,
                pendenciasComCheques: possuiPendencias === "S" ? Random.number(0, 999999999) : 0,
                percentualTitulosAtraso: percentualTitulosAtraso[Random.number(0, 3)],
                quantidadeTitulosVencidos: titulosVencidos === "S" ? Random.number(0, 99999) : 0,
                possuiDocumentacao: (Random.number(1, 101) % 2 === 0) ? "S" : "N",
                ultConsultaSerasa: dateFormat(Random.date(new Date(2019, 0, 1), new Date()),'dd/mm/yyyy')
            })
            return res.status(200).json(avaliacaocredito)
        }
        
        return res.status(500)

    })
})

module.exports = router