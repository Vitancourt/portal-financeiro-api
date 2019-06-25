const repository = require('../../repository/titulosvencidos')
const TitulosVencidos = require('../../models/titulosvencidos')
const User = require('../../models/user')
const router = require('express').Router()
var dateFormat = require('dateformat');
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

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  

router.post('/', (req, res, next) => {
  
    const {
        cdUnd,
        cdCliente
    } = req.body

    const user = User.find({ cdUnd: cdUnd, cdCliente: cdCliente }, function (err, users) {
        
        if (err) return console.error(err)
        console.log(users)
        if(users[0] === undefined) return res.status(500).json({msg: "User not found"})
        if(cdUnd === users[0].cdUnd && cdCliente === users[0].cdCliente) {

            const especie = [
                "Bloqueto",
                "Venda a Vista",
                "Cheque Pre",
                "Esp. Boleto Avulso",
                "Bloqueto",
                "Crédito Conta",
                "Aviso Debito Tarifa",     
                "Vale",                   
                "Boleto Comodato",
                "Cheque Devolvido",
                "Cheque Representado",
                "Confissão de Dívida",
                "Adiantamento FP.",
                "Aviso Débito",
                "Vale Funcionário",
                "Vale Funcionário Out.",
                "Vale Vasilhame",
                "Cartão Débito a Vista",
                "Cartão Débito a Prazo"
            ]
          
            let titulo =  TitulosVencidos({
                cdEmpresa: generateRandom(1,99) * 100,
                cdFilial: generateRandom(1,99) * 1000,
                nrTitulo: generateRandom(1,99) * 100000,
                nrParcela: generateRandom(1,99) * 12,
                cdEspecie: generateRandom(1,99) * 99,
                dsEspecie: especie[generateRandom(1,99) * especie.length],
                dtEmissao: dateFormat(randomDate(new Date(2019, 0, 1), new Date()),'dd/mm/yyyy'),
                dtVencimento: dateFormat(randomDate(new Date(2019, 12, 30), new Date()),'dd/mm/yyyy'),
                vlTitulo: (generateRandom(1,99)) * 9999,
                nrDiasEmAberto: generateRandom(1,999999999),
                stTitulo: "Vencido"
            })
            titulo.save()
                .then(newBill => {
                    return res.status(201).json(newBill)
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({msg:'Error saving bill'})
                })
        }
    })
})

module.exports = router