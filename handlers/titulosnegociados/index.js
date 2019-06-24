const router = require('express').Router()
const repository = require('../../repository/titulosnegociados')
const TitulosNegociados = require('../../models/titulosnegociados')
const User = require('../../models/user')
var dateFormat = require('dateformat')


// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.get('/', (req, res, next) => {
    return res.status(200).json(repository)
})

const generateRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

router.post('/', (req, res, next) => {

  
    const {
        cdUnb,
        cdCliente
    } = req.body

    const user = User.find({cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users){
        if(err) return console.log(err)
        if(users[0] === undefined) return res.status(500).json({msg: "User not found!"})
        if(cdUnb === users[0].cdUnb && cdCliente === users[0].cdCliente) {
            const titulosnegociados =  TitulosNegociados({
                nrAcao:generateRandom(1,999999),
                prJuros:generateRandom(1,9),
                prMulta:generateRandom(1,99),
                vlTotalNegociacao:generateRandom(1,999),
                dsFormaNegociacao:"Boleto Avulso",
                tpFrequenciaPagto:generateRandom(1,9),
                Boleto: {
                  nrParcela:generateRandom(1,9),
                  vlBoleto:generateRandom(1,999),
                  dtVencBoleto:dateFormat(randomDate(new Date(2019, 0, 1), new Date()),'dd/mm/yyyy'),
                  stBoleto:generateRandom(1,9),
                  cdBarraBoleto:"34191090080004935293383338180009139720000014356",
                  dsStBoleto: "GERADO",
                  link:"P0810800000404700000000049368420000000020190603"
                }
          })
      
          titulosnegociados.save()
              .then(titulosnegociadosSaved => {
                  return res.status(201).json(titulosnegociados)
              })
              .catch(err => {
                  return res.status(500).json({msg: 'Nao existe titulos negociados'})
              })
        }
    })
})

module.exports = router