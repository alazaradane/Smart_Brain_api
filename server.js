const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()
app.use(bodyParser.json()) 
app.use(cors())


const database = {
    users:[
        {
            id:'123',
            name:'Alazar',
            email:'alazar@gmail.com',
            password:'human',
            entries:0,
            joined: new Date(),

        },
        {
            id:'124',
            name:'Barkon',
            email:'barkon@gmail.com',
            password:'bro123',
            entries:0,
            joined: new Date(),

        },
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users)
})


// Sign in users
app.post('/signin',(req,res)=>{
    bcrypt.compare('135','$2a$10$cMxFC7lqsx14hcjQ3YO9CeIMZNcCGXJcdCLDaE5.BburjvBH2TPo6',(err,res)=>{
        console.log('Guess: ', res)
    })
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        return res.json('Successfully logged in')
    }else{
        return res.status(400).send('Failed while logging...')
    }
})

// Registering users
app.post('/register',(req,res)=>{
    const {name, email, password} = req.body
    bcrypt.hash(password,null,null, function(err,hash){
        console.log(hash)
    })
    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries:0,
        joined: new Date(),
    })
    res.send(database.users[database.users.length-1])
})


// Profile Route
app.get('/profile/:id',(req,res)=>{
    const {id} = req.params
    let found = false
    database.users.forEach(user => {
        if(user.id === id){
            found = true
           return  res.json(user)
        }
    })
    if(!found){
        return res.status(404).json(`User with ${id} id not found!`)
    }
})

// Image Route
app.put('/image', (req,res)=>{
    const {id} = req.body
    let found = false
    database.users.forEach(user =>{
        if(id === user.id){
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found) return res.status(404).json(`User with ${id} ID not found`)
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000...')
})