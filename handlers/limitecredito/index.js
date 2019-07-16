const LimiteCredito = require('../../models/limitecredito')
const Random = require('../../helper/random')
const router = require('express').Router()
const User = require('../../models/user')

// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.get('/', (req, res, next) => {
    if (parseInt(req.query.ppopcao) !== 55 || parseInt(req.query.requisicao) !== 86 || parseInt(req.query.opcao) !== 11) return res.status(500)
    const cdUnb = parseInt(req.query.cdUnb)

    const cdCliente= parseInt(req.query.cdCliente)

    const user = User.find({cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users) {

        if(err) return console.log(err)

        if(users[0] === undefined) return res.status(500).json({msg: "User not found"})

        if(cdUnb === users[0].cdUnb && cdCliente === users[0].cdCliente) {

            let titulosVencidos = Random.number(1,101) % 2 ? "S":"N"
            let titulosAVencer = Random.number(1, 101) % 2 ? "S":"N"
            let pedidosFuturos = Random.number(1, 101) % 2 ? "S":"N"
            let creditoDisponivel = Random.number(1,101) % 2 ? "S":"N"

            let limitecredito = LimiteCredito({
                limiteAprovado: Random.number(0, 10000),
                classeRisco: Random.number(1, 6),
                possuiTitulosVencidos: titulosVencidos,
                totalTitulosVencidos: titulosVencidos === "S" ? Random.number(0, 50000, 2):0,
                totalTitulosAvencer: titulosAVencer === "S" ? Random.number(0, 900000, 2):0,
                totalPedidosFuturos: pedidosFuturos === "S" ? Random.number(0, 100000, 2):0,
                possuiCreditoDisponivel: creditoDisponivel,
                
            });

            return res.status(200).json(limitecredito)
            
        }
        
        return res.status(500)

    })
})

module.exports = router