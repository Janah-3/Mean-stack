
const fs = require("fs")

const getAllUsers = (req,res)=>{
    let user = fs.readFileSync("./models/user.json","utf-8")
    user=JSON.parse(user)
    res.status(200).json(user)
}

const createUser=(req,res)=>{
    let newUser= req.body
    let user = fs.readFileSync("./models/user.json","utf-8")
     user=JSON.parse(user)
     user.push(newUser)
     fs.writeFileSync("./models/user.json",JSON.stringify(user))
    res.status(201).json({message:"user created"})
    
}
module.exports = { getAllUsers, createUser }
