const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image  = require('./controllers/image')

const db = knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'admin',
        database:'smart_brain'
    }
})



const app = express()
app.use(bodyParser.json()) 
app.use(cors())



app.get('/',(req,res)=>{
    db('users').select('*').then(data=>{
        res.json(data)
    })
})


// Sign in users
app.post('/signin', signin.handleSignin(db,bcrypt))

// Registering users
app.post('/register',register.handleRegister(db,bcrypt))


// Profile Route
app.get('/profile/:id', profile.handleProfileGet(db))

// Image Route
app.put('/image', image.handleImage(db))

// Clarifai Api
app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res)})


app.listen(3000,()=>{
    console.log('Server is running on port 3000...')
})