const db = require('../db/db_connection')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const getMessages = (req, res) => { 
    db.any('SELECT * FROM messages')
    .then(data => {res.json(data)})
    .catch(err => {console.log(err); res.json({err, status:'there was a error in pulling from the messages db'})})
 }

 module.exports = {
     getMessages
 }