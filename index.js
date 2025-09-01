// var validitor = require("validator")
// const http = require("http")

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"content-type":"text/plain"});
//     res.end("hello from server http")
// })
// server.listen(5001,()=>{
//     console.log("server is running on port 5001")
// })

// var email="heba@gmail.com"
// console.log(validitor.isEmail(email))

// const http = require("http")
// var fs = require("fs")
// var path = require("path")
// const querystring = require("querystring");

// const { json } = require("stream/consumers")
// const filePath=path.join(__dirname,"products.json")
// if(!fs.existsSync(filePath)){
//     fs.writeFileSync(filePath,"[]")
// }

// function loadProducts(){
//     if(fs.existsSync(filePath)){
//         const data = fs.readFileSync(filePath)
//         return JSON.parse(data)
//     }
//     return []
// }

// const server = http.createServer((req,res)=>{
// if (req.method === "GET" && req.url === "/") {
//     const html = `
//     <html>
//     <body>
//       <h1>Welcome to the product API</h1>
//       <form action="/add" method="POST">
//         <input type="text" name="product" placeholder="enter product name" required><br>
//         <input type="number" name="price" placeholder="enter product price" required><br>
//         <button type="submit">Add product</button>
//       </form>
//       <h2>All products</h2>
//       <ul>
//         ${loadProducts().map(p=> `<li>${p.name} - $${p.price}</li>`).join("")}
//       </ul>
//     </body>
//     </html>
//     `;
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.end(html);

// } else if (req.method === "POST" && req.url === "/add") {
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//         const data = querystring.parse(body);
//         const products = loadProducts();
//         products.push({ name: data.product, price: parseFloat(data.price) });
//         fs.writeFileSync(filePath, JSON.stringify(products));
//         res.writeHead(302,{"location":"/"})
//         res.end()
      
//     });




// }else{
//     res.writeHead(404,{"content-type":"text/html"})
//     res.end("<h1> 404 not found </h1>")
// }
// })
// server.listen(5001,()=> {
//     console.log("server is running on port 5001")
// })
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
    // Read users from file
    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    users.push(user);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    res.status(201).json(user);
});


app.get('/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));
    res.status(200).json(products);
});

app.post('/products', (req, res) => {
    const product = req.body;
    const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));
    products.push(product);
    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
    res.status(201).json(product);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
