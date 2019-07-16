const router = require('express').Router()

router.use('/titulos-vencidos', require('./titulosvencidos'))
router.use('/totais-negociacoes', require('./totaisnegociacao'))
router.use('/formas-pagamento', require('./formasdepagamento'))
router.use('/realizacao-de-negociacao', require('./realizacaodanegociacao'))
router.use('/user', require('./user'))
router.use('/titulosnegociados', require('./titulosnegociados'))
router.use('/gerar-boleto', require('./gerarboleto'))
router.use('/titulo-cliente', require('./titulocliente'))
router.use('/avaliacao-de-credito', require('./avaliacaocredito'))
router.use('/limite-de-credito', require('./limitecredito'))
module.exports = router