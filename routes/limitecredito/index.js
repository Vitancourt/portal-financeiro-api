const router = require('express').Router()

router.use('/', require('../../handlers/limitecredito'))

module.exports = router