const router = require('express').Router()

router.use('/', require('../../handlers/atualizacaocadastral'))

module.exports = router