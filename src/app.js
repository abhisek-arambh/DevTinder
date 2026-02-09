const express = require("express");  
const connectDb = require("./config/database");
const app = express();

connectDb()
.then(() => {
    console.log("database is connected successsfully");
    app.listen(7777, () =>{
    console.log("server is sucessfully working");
    }); 
})
.catch((err) =>{
    console.error("database cannot be connected!");
});