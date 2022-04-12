const express = require('express');
const router = express.Router();
const MsgFunctions = require('../models/messages');
const MiddleWare = require('../models/middleware');

router.get('/', MsgFunctions.getMessages);

module.exports = router