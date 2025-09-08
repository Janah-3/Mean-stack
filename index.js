const { Socket } = require("engine.io")
const express = require("express")
const http = require("http")
const { console } = require("inspector")
const path =require("path")
const {server} = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = new server (server)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))

})

io.on("connection",(Socket)=>{
    console.log("a user connected")

    Socket.on("chat msg",(msg)=>{
        io.emit("chat msg",(msg))
    })

    Socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})

server.listen(3000,()=>{
    console.log("server is running on port 3000")
})