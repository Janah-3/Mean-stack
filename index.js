const express = require("express")
const app = express()
const mongoose=require('mongoose')
const dontenv = require('dotenv')
dontenv.config()


app.use(express.json());

const userRoute=require("./routes/user")
const productRoute=require("./routes/product")


app.use("/user",userRoute)
app.use("/product",productRoute)


mongoose. connect (process.env.DBURL). then(()=>{
console. log("Connected to MongoDB")
}).catch((err)=>{

console.error("Error connecting to MongoDB:", err);
})

app.listen(process.env.PORT,()=>{
console.log("server is running on port 5000")
})



//create getall update delete getbyid 
///validtions 
////authentication ,authrization