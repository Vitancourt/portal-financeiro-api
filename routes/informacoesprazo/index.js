const router = require('express').Router()

router.use('/', require('../../handlers/informacoesprazo'))

module.exports = router