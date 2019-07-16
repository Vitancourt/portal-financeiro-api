const dateFormat = require('dateformat')
const InformacoesPrazo = require('../../models/informacoesprazo')
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

            let prazoAtual = Random.number(0, 98)

            let informacoesPrazo = InformacoesPrazo({
                prazoAtual: prazoAtual,
                prazoMaximo: Random.number(prazoAtual, 99),
                possuiTitulosVencidos: Random.number(1, 101) % 2 === 0 ? "S" : "N",
                historico: [{
                    dataAlteracao: dateFormat(Random.date(new Date(2019, 6, 1), new Date(2019,11, 30)),'dd/mm/yyyy'),
                    prazoAlterado: Random.number(0, 99),
                    motivoAlteracao: 'Solicitacao Aprovada'
                }]
            });

            return res.status(200).json(informacoesPrazo)
            
        }
        
        return res.status(500)

    })
})

module.exports = router