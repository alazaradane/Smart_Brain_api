const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json()) 


const database = {
    users:[
        {
            id:'369',
            name:'Alazar',
            email:'alazar@gmail.com',
            password:'human',
            entries:0,
            joined: new Date(),

        },
        {
            id:'123',
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
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('Successfully logged in')
    }else{
        res.status(400).send('Failed while logging...')
    }
})

// Registering users
app.post('/register',(req,res)=>{
    const {name, email, password} = req.body
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

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})