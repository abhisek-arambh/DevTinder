const express = require("express");

const app = express();

app.use(
    "/user" , 
    (req , res , next) => {
    console.log("sending message for the router");
    // res.send("this is route no. 1");
    next();
},(req , res , next) => {
    console.log("sending message for the router again");
    // res.send("this is route no. 2");
    next();
}, (req , res , next) => {
    console.log("sending message for the router again");
    // res.send("this is route no. 3");
    next();
}, (req , res , next) => {
    console.log("sending message for the router again");
    // res.send("this is route no. 4");
    next();
}, (req , res , next) => {
    console.log("sending message for the router again");
    // res.send("this is route no. 5");
    next();
}, (req , res) => {
    console.log("sending message for the router again");
    res.send("this is route no. 6");
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});