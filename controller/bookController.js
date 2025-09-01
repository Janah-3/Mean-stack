
const fs = require("fs")

const getAllBooks = (req,res)=>{
    let user = fs.readFileSync("./models/book.json","utf-8")
    user=JSON.parse(user)
    res.status(200).json(user)
}

const AddBook=(req,res)=>{
    let newBook= req.body
    let book = fs.readFileSync("./models/book.json","utf-8")
     book=JSON.parse(book)
     book.push(newBook)
     fs.writeFileSync("./models/book.json",JSON.stringify(book))
    res.status(201).json({message:"book added"})
    
}
module.exports = { getAllBooks, AddBook }
