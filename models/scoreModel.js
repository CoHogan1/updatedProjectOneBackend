const mongoose = require('mongoose')
const { Schema, model} = mongoose


const highScore = new Schema ({

    user:      {type:String, required: true},
    highscore: {type:Number, required: true},

}, {timestamp: true})

const Score = model('score', highScore)

module.exports = Score
