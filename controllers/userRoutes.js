const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', User.login)

module.exports = router