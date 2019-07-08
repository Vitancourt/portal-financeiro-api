const router = require('express').Router()

router.use('/', require('../../handlers/titulocliente'));

module.exports = router;