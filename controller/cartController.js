
const fs = require("fs")

const getAllCartItems = (req,res)=>{
    let items = fs.readFileSync("./models/cart.json","utf-8")
    items=JSON.parse(items)
    res.status(200).json(items)
}

const AddToCart=(req,res)=>{
    let newItem= req.body
    let items = fs.readFileSync("./models/cart.json","utf-8")
     items=JSON.parse(items)
     items.push(newItem)
     fs.writeFileSync("./models/cart.json",JSON.stringify(items))
    res.status(201).json({message:"item added"})
    
}
module.exports = { getAllCartItems, AddToCart }
