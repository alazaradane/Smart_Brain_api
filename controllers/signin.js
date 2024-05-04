const signin = (db,bcrypt) => (req,res)=>{
    const {email, password} = req.body
    if(!email,!password){
        return res.status(400).json('incorrect Submission')
    }
   db.select('email','hash').from('login')
   .where('email','=',email)
   .then(data=>{
        const isvalid = bcrypt.compareSync(password, data[0].hash)
        if(isvalid){
           return db.select('*').from('users').where('email','=', email)
            .then(user =>{
                res.json(user)
            })
            .catch(err=> res.json(err.detail))
        } else{
           return res.status(400).json('Wrong email or passwords')
        }
   })
   .catch(err=>res.status(400).json(err.detail));
}

module.exports = {
    handleSignin: signin
}