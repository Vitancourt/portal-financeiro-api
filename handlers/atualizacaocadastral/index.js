const mongoose = require('mongoose')
const Random = require('../../helper/random');
const router = require('express').Router();
const User = require('../../models/user');

// Handlers are responsible for managing the request and response objects, and link them to a service module that will do the hard work.
// Each of the following handlers has the req and res parameters, which stands for request and response. 
// Each handler of this module represents an HTTP verb (GET, POST, PUT and DELETE) that will be linked to them in the future through a router.

router.post('/', (req, res, next) => {

    const {
        ppopcao,
        requisicao,
        opcao,
        origem,
        cdUnb,
        cdCliente,
        email,
        cel
    } = req.body;
    
    if(!req.body) return res.status(400).json({msg: 'Missing User'})

    const user = User.find({ cdUnb: cdUnb, cdCliente: cdCliente}, function(err, users) {
        
        if(err) return console.log(err);

        if(users[0] === undefined)
            return res.status(500).json({msg: 'User not found'});

        if (parseInt(ppopcao) !== 55 || parseInt(opcao) !== 1 || parseInt(origem) !== 1)
            return res.status(500).json({msg: "Erro de parametro"})


        if(parseInt(cdUnb) === users[0].cdUnb && parseInt(cdCliente) === users[0].cdCliente)
            return res.status(201).json({msg: 'Dados cadastrais atualizados'})
        
        return res.status(500).json({msg: 'Erro na atualização cadastral'})
    });

})

module.exports = router