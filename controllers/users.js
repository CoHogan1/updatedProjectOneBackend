const express = require('express')
const router = express.Router()
const User = require('../models/usersModel')
const bcrypt = require('bcrypt')


router.get('/database', (req, res)=>{
    console.log('database check')
    User.find({}, (err, database)=>{
        if (err){
            console.log(err)
            res.send("error")
        } else {
            res.send(database)
        }
    })
})

router.post('/login', (req, res)=>{
    //console.log(req.body)
    // search db for users email.
    User.findOne({ email: req.body.email}, (error, foundUser) => {
        if (error) {
          res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundUser)
    })
})


// add new user to the database
router.post('/register', (req, res)=>{
    console.log('register');
    // verify what is being sent back
    console.log(req.body)
    // encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    // crate user in Database
    User.create(req.body, (error, createdUser) => {
    if (error) {
        res.status(400).json({ error: error.message })
    } else {
        console.log(createdUser);
        res.status(200).json(createdUser) //  .json() will send proper headers in response so client knows it's json coming back
     }
    })

})

module.exports = router
