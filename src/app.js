const express = require("express");

const app = express();
//this will only handle get call to /user
app.get("/user",(req , res) => {
    res.send({firstName : "Abhisek" , lastName : "Singh" });
});

app.post("/user",(req ,res) =>{
    //saving data to db
    res.send("your data is sucessfully saved to the database");
})

app.put("/user", (req , res) =>{
    res.send("i'm putting this data right now");
});

app.delete("/user", (req , res) =>{
    //deleting data
    res.send("your data is deleted sucessfully");
});

app.patch("/user", (req , res) => {
    res.send("this data is patched");
});

app.head("/check", (req, res) => {
  res.set("X-Server", "Express");
  res.status(200).end();   // no response body
});


app.options("/user", (req , res) => {
    res.send("the options are here");
});
//this will matches to all the http methods API call to /test
app.use("/hello",(req , res) => {
    res.end("Hello from the server");
});
app.use("/test",(req , res) => {
    res.end("Welcome to the server");
});
// app.use("/",(req , res) => {
//     res.end("access is given ");
// });

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});