const express = require("express");

const app = express();

app.use("/" , (req , res , next) => {
    // console.log("the messare is sending to the router");
    // res.send("this is route no. 2");
    next();
});

app.get("/user",
    (req , res , next) => {
    console.log("handling /user route");
    next();
}, (req , res , next) => {
    next();
} , (req , res , next) => {
    res.send("2nd route handler");
});
app.listen(7777, () =>{
    console.log("server is sucessfully working");
});