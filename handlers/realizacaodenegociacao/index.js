const repository = require('../../repository/titulosnegociados')
const RealizacaoDeNegociacao = require('../../models/realizacaodanegociacao')
const User = require('../../models/user')
const router = require('express').Router()
const mongoose = require('mongoose')
// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

const generateRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}
router.post('/', (req, res, next) => {
    const {
        cdUnb,
        cdCliente
    } = req.body

    const user = User.find({ cdUnb: cdUnb, cdCliente: cdCliente }, function(err, users){
        if (err) return console.error(err)
        console.log(cdUnb)
        console.log(users[0].cdUnb)
        if (users[0] === undefined) return res.status(500).json({msg: "User not found!"})
        if (parseInt(cdCliente) === users[0].cdCliente && parseInt(cdUnb) === users[0].cdUnb) {
                const negociacaoData = new RealizacaoDeNegociacao({
                        message: 'Processo concluido'
                })       
                negociacaoData.save()
                    .then(negociacaoDataSaved => {
                        return res.status(201).json(negociacaoDataSaved)
                    })
                    .catch(err => {
                        return res.status(500).json({msg: "Cannot save negotiation"})
                    })
        } else {
            const negociacaoData = new RealizacaoDeNegociacao({
                    message:{
                        message:'Cliente não cadastrado',
                        fileStatus:generateRandom(1,100)
                    }
            })       
            negociacaoData.save()
                .then(negociacaoDataSaved => {
                    return res.status(201).json(negociacaoDataSaved)
                })
                .catch(err => {
                    return res.status(500).json({msg: "Cannot save negotiation"})
                })
        }
    })
})

module.exports = router