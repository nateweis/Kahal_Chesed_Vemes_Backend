const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const login = (req, res ) => {
    jwt.sign({data:"This is the payload"}, secret, {expiresIn: '1d'}, 
    (err, token)=>{res.status(201).append('Accept','true').json({token})}
    )
}

module.exports = {
    login
}
