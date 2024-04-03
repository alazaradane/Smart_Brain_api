const express = require('express')

const app = express()

const database = {
    users:[
        {
            id:'369',
            name:'Alazar',
            
        }
    ]
}

app.get('/',(req,res)=>{
    res.send('Root route...')
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})