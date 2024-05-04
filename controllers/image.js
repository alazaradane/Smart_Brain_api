
const Clarifai = require('clarifai')
const app = new Clarifai.App({
    apiKey:"3de2333d0548430aa691d862cff4d87d"
  })

const handleApiCall = (req,res)=>{
    app.models.predict('face-detection' , req.body.input)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.status(400).json('unable to work with API'))
} 

const image = (db)=>(req,res)=>{
    const {id} = req.body
    db('users').where('id','=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('error getting user'))
}

module.exports = {
    handleImage: image,
    handleApiCall: handleApiCall
}