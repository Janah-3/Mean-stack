// setTimeout(() => {
//     console.log("hellooo");
// }, 1000);

// const { sum, x } = require('./module.js');

// console.log(sum(5, 10));
// console.log(x);         

const { log } = require("console")
const fs = require("fs")
// var data = fs.readFileSync("test.txt","utf8") 
// console.log(data)

// fs.readFile("test.txt","utf8",(err,data) => {
//     if(err){
//         console.log("file not found")
//     }
//     console.log(data)
// })

// var mes = "hello from node js";
// // fs.writeFileSync("test.txt", mes);
// fs.appendFileSync("test.txt",mes)


console.log(process.argv)
const[,,command] = process.argv
if(command === "read"){
    var data = fs.readFileSync("test.txt")
    console.log(data.toString())
}
if(command==="write"){
    const [,,,title] = process.argv
    const todos=fs.readFiles("todos.json","utf-8")
    todos.push({title})
    fs.writeFileSync("todos.json",JSON.stringify(todos))

}
if(command==="update"){
    const [,,,index, newTitle] = process.argv;

    const data = fs.readFileSync("todos.json", "utf8");
    const todos = JSON.parse(data);

    if( index >= 0 && index < todos.length){
        todos[index].title = newTitle;
        fs.writeFileSync("todos.json", JSON.stringify(todos));
    }

}if(command==="delete"){
    const [,,,index, ] = process.argv;

    const data = fs.readFileSync("todos.json", "utf8");
    const todos = JSON.parse(data);

    if(index >= 0 && index < todos.length) {
      
        todos.splice(index, 1); 
        
        
        fs.writeFileSync("todos.json", JSON.stringify(todos));
    }
}if(command == "readOne"){
    const [,,,title] = process.argv
    const data=fs.readFileSync("todos.json","utf-8")
    const todos = JSON.parse(data);

    const todo = todos.find(t => t.title === title);

    if(todo != null){
    console,log(todo)
    }else{
        console.log("not found")
    }
}