const express = require("express");

const app = express();

app.use("/hello",(req , res) => {
    res.end("Hello from the server");
});
app.use("/test",(req , res) => {
    res.end("Welcome to the server");
});
app.use("/",(req , res) => {
    res.end("access to the server");
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});