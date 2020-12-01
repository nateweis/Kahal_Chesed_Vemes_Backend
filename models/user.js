const db = require('../db/db_connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const secret = process.env.SECRET

// Goes through the database to see if the username is already taken
function checkUserExistance(name, callback){
    let holdData = 0
    db.any('SELECT * FROM users WHERE username = $1', name)
    .then(data => {
       holdData= callback(data)
       return holdData
    })
    .catch(err => console.log(err))
    
}


const newUser = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    db.none('INSERT INTO users (username, password, email, admin) VALUES (${username}, ${password}, ${email}, ${admin})', req.body)
    .then(()=>res.json({message:"Username Made"}))
    .catch(err=> res.json({err, message:"User not made"}))
}

const login = (req, res ) => {
    console.log(checkUserExistance(req.body.username, d => { return d}))
    db.any('SELECT * FROM users WHERE username = $1', req.body.username)
    .then(data => {
        // console.log(data)
    })
    jwt.sign({data:"This is the payload"}, secret, {expiresIn: '1d'}, 
    (err, token)=>{res.status(201).append('Accept','true').json({token})}
    )
}

module.exports = {
    login,
    newUser
}
