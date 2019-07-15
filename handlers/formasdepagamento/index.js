const repository = require('../../repository/formasdepagamento')
const FormaDePagamento = require('../../models/formadepagamentos')
const router = require('express').Router()
const User = require('../../models/user')
var dateFormat = require('dateformat')


// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

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

  

    const user = User.find({cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users) {
        console.log(users);
        
        if (err) return console.log(err)
        if(users[0] === undefined) return res.status(500).json({msg: "User not found"})
        if(parseInt(cdUnb) === users[0].cdUnb && parseInt(cdCliente) === users[0].cdCliente) {

            const peridodicidade = [
                "S",
                "Q",
                "M"
             ]
             
             const entrada = [
                 "S",
                 "N"
             ]
         
             const formaParcelamento = [
                 "Semanal S/ Entrada",
                 "Semanal C/ Entrada",
                 "Quinzenal S/ Entrada",
                 "Quinzenal C/ Entrada",
                 "Mensal S/ Entrada",
                 "Mensal C/ Entrada"
             ]
             const parcelas = generateRandom(1,9)
             const totalParcelado = generateRandom(1,999)
             const primeiraParcela = totalParcelado / parcelas
             const demaisParcelas = totalParcelado / parcelas   

            const formadepagamentos = FormaDePagamento({
                idPeridodicidade: peridodicidade[generateRandom(0,2)],
                idEntrada: entrada[generateRandom(0,1)],
                dsFormaParcelamento: formaParcelamento,
                nrParcelas: parcelas,
                vlTotalParcelado: totalParcelado,
                vlPrimeiraParcela: primeiraParcela,
                vlDemaisParcelas: demaisParcelas,
                dtPrimeiroVenc: dateFormat(randomDate(new Date(2019, 0, 1), new Date()),'dd/mm/yyyy')
                    
            })
            console.log("TCL: formadepagamentos", formadepagamentos)
            
            formadepagamentos.save()
            .then(formadepagamentosSaved => {
                return res.status(201).json(formadepagamentosSaved)
            })
            .catch(err => {
                return res.status(500).json({msg: "Nao existe forma de pagamento"})
            })
        }
        
    })
})

module.exports = router