const router = require('express').Router();
const TituloCliente  =  require('../../models/titulocliente');
const User = require('../../models/user');
var dateFormat = require('dateformat')
const mongoose = require('mongoose')

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
    } = req.body;
    
    const entrada = [
        "S",
        "N"
    ]

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
   
   let  vencidos = entrada[generateRandom(0,1)];
   let  avencer  = entrada[generateRandom(0,1)];
   let  pagos    = entrada[generateRandom(0,1)];   
    const user = User.find({ cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users) {
        if(err) return console.log(err);
        if(users[0] === undefined) return res.status(500).json({msg: 'User not found'});
        if(parseInt(cdUnb) === users[0].cdUnb && parseInt(cdCliente) === users[0].cdCliente) {
            let titulocliente = TituloCliente({
                possuiTitulosVencidos: vencidos,
                possuiTitulosAvencer: avencer,
                possuiTitulosPagos: pagos,
                    TitulosVencidos: vencidos === "S" ? [
                        {
                            cdEmpresa: generateRandom(1,99),
                            cdFilial: generateRandom(1, 999),
                            nrTitulo: generateRandom(1, 99999),
                            nrParcela: generateRandom(1, 9),
                            dsEspecie: especie[generateRandom[1, 20]],
                            dtEmissao: dateformat(randomDate(new Date(2019, 12, 01), new Date('dd/mm/yyyy'))),
                            dtVencimento: dateFormat(randomDate(new Date(2019,12, 30)),new Date('dd/mm/yyyy')),
                            vlTitulo: generateRandom(1,999),
                            nrDiasEmAberto: generateRandom(1, 999),
                        }
                    ] : null,
                    TitulosAvencer = avencer === 'S' ? [
                        {
                            cdEmpresa: generateRandom(1,99),
                            cdFilial: generateRandom(1, 999),
                            nrTitulo: generateRandom(1, 99999),
                            nrParcela: generateRandom(1, 9),
                            dsEspecie: especie[generateRandom[1, 20]],
                            dtEmissao: dateformat(randomDate(new Date(2019, 12, 01), new Date('dd/mm/yyyy'))),
                            dtVencimento: dateFormat(randomDate(new Date(2019,12, 30)),new Date('dd/mm/yyyy')),
                            vlTitulo: generateRandom(1,999),
                        }
                    ] : null,
                    TitulosPagos = pagos === 'S' ? [
                        {
                            cdEmpresa: generateRandom(1,99),
                            cdFilial: generateRandom(1, 999),
                            nrTitulo: generateRandom(1, 99999),
                            nrParcela: generateRandom(1, 9),
                            dsEspecie: especie[generateRandom[1, 20]],
                            dtEmissao: dateformat(randomDate(new Date(2019, 12, 01), new Date('dd/mm/yyyy'))),
                            dtPagamento: dateFormat(randomDate(new Date(2019,12, 30)),new Date('dd/mm/yyyy')),
                            vlTitulo: generateRandom(1,999),
                        }
                    ] : null       
                })
        }

        titulocliente.save()
            .then(tituloclienteSaved => {
                return res.status(201).json(tituloclienteSaved)
            })
            .catch(err => {
                return res.status(500).json({msg: 'Erro ao salvar o titulo do cliente'})
            })
    });
})

module.exports = router