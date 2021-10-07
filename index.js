// libraries
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('sessions')
const eSession = require('express-sessions')
const methodOverride = require('method-override')
const cors = require('cors')
//const systemController = require() // do I need this?

// Database
const mongoURI = process.env.MONGODB || 'mongodb://127.0.0.1:27017/' + "projectOneUpdated"
const db = mongoose.connection

// react front end port will run on port 3000
const PORT = process.env.PORT || 3001


// app :)
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))


// handle connection to Database
mongoose.connect(mongoURI , {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("Mongo connection is  established.")
})


// Database connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running!!!'))
db.on('connected', ()=> console.log('Mongo connected'))
db.on('disconnected', ()=> console.log('Mongo is now Disconnected, Have a good day!'))

// cors handeling.
const whitelist = ['http://localhost:3000','http://localhost:3001','https://git.heroku.com/updatedprojectonebackend.git', 'https://git.heroku.com/updatedprojectonefrontend.git' ]// all strings.
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            // -1 outside the array
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

app.get('/home', (req, res)=>{
    console.log('Redirected to home')
    res.redirect('/user')
})

app.get('/', (req, res)=>{
    console.log('here')
    res.send('working')
})

const userControllers = require('./controllers/users')
app.use('/user', userControllers)


const scoreControllers = require('./controllers/score')
app.use('/score', scoreControllers)


// run the server.
app.listen(PORT, (req, res)=>{
    console.log("Server Running on--", PORT)
})
