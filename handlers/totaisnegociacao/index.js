const repository = require('../../repository/totaisnegociacao')
const logger = require('morgan')
const router = require('express').Router()
const User = require('../../models/user')
const Negociacao = require('../../models/totaisnegociacao')


// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.get('/', (req, res, next) => {
    return res.status(200).json({repository})
})
const generateRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}


router.post('/',(req, res, next) => {

    const {
        cdUnb,
        cdCliente
    } = req.body

    const user = User.find({cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users){
        if(err) return console.log(err)
        if(users[0] === undefined) return res.status(500).json({msg: "User not found"})
        if(parseInt(cdUnb) === users[0].cdUnb && parseInt(cdCliente) === users[0].cdCliente) {
            
            const negociacao = Negociacao({
                vlTotalSemCorrecao: (generateRandom(1,99)) * 9999,
                vlTotalCorrigido: (generateRandom(1,99)) * 9999,
                vlTotalBoleto: (generateRandom(1,99)) * 9999,
                vlTotalParcelado: generateRandom(1,99),
                prJuros: generateRandom(1,5),
                prMulta: generateRandom(1,5)
            })
        
            negociacao.save()
                .then(negociacaoSaved => {
                    return res.status(201).json(negociacaoSaved)
                })
                .catch(err => {
                    return res.status(500).json({msg : 'Error saving negotiation'})
                })
        }
    })
 
})
module.exports = router