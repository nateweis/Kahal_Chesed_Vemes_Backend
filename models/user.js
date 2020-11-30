const db = require('../db/db_connection')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const newUser = (req, res) => {
    db.none('INSERT INTO users (username, password, email, admin) VALUES (${username}, ${password}, ${email}, ${admin})', req.body)
    .then(()=>res.json({message:"Username Made"}))
    .catch(err=> res.json({err, message:"User not made"}))
}

const login = (req, res ) => {
    jwt.sign({data:"This is the payload"}, secret, {expiresIn: '1d'}, 
    (err, token)=>{res.status(201).append('Accept','true').json({token})}
    )
}

module.exports = {
    login,
    newUser
}
