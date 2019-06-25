const router = require('express').Router()

router.use('/', require('../../handlers/gerarboleto'))

module.exports = router