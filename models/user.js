const jwt = require('jsonwebtoken')

const login = (req, res ) => {
    jwt.sign({data:"This is the payload"}, 'tempSecret', {expiresIn: '1d'}, 
    (err, token)=>{res.status(201).append('Accept','true').json({token})}
    )
}

module.exports = {
    login
}
