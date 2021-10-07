const express = require('express')
const router = express.Router()
const Score = require('../models/scoreModel')

// score/route
router.get('/highscore', (req, res)=>{
    console.log('high score check')
    Score.find({}, 'user highscore',(err, database)=>{
        if (err){
            console.log(err)
            res.send("error")
        } else {
            //console.log(database)
            res.send(database)
        }
    })
})

// add highscore to DB
router.post('/add', (req, res)=>{
    // score highscore
    console.log('adding high score');
    console.log(req.body)
    Score.create(req.body, (error, createdScore) => {
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
            //console.log(createdScore);
            res.status(200).json(createdScore) //  .json() will send proper headers in response so client knows it's json coming back
        }
    })
})

module.exports = router
