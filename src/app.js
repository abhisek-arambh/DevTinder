const express = require("express");  
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req , res) =>{
    const user = new User({
        firstName : "Abhisek",
        lastName : "Singh",
        emailId : "abhisek02feb@gmail.com",
        password :"Abhi@123",
        age : 22,
        gender : "male",
    });
    try{
    await user.save();
    res.send("user added successfully");
    }catch(err){
        res.status(404).send("error while adding user:" + err.message);
    }
})

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