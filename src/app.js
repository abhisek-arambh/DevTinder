require("dotenv").config();
const express = require("express");  
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req , res) =>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.status(404).send("error while adding user:" + err.message);
    }
});

app.get("/users", async (req , res) =>{
    const userEmail = req.body.firstName;

    try{
        const user = await User.findOne({firstName : userEmail});
        if(!user){
            return res.status(404).send("user not found");
        }else{
            res.send(user);
        }
        // if(user.length === 0){
        //     return res.status(404).send("user not found");
        // }else{
        //     res.send(user);
        // }
    }catch (err){
        res.status(404).send("Something went wrong");
    }
});

// app.get("/users", async (req , res) =>{
//     const userEmail = req.body.emailId;

//     try{
//         const user = await User.find({emailId : userEmail});
//         if(user.length === 0){
//             return res.status(404).send("user not found");
//         }else{
//             res.send(user);
//         }
//     }catch (err){
//         res.status(404).send("Something went wrong");
//     }
// });

app.get("/feed", async(req , res) =>{

    try{
        const user = await User.find({});
        res.send(user);
    }catch(err){
        res.status(404).send("Something went wrong");
    }
});

connectDb()
.then(() => {
    console.log("database is connected successsfully");
    app.listen(7777, () =>{
    console.log("server is sucessfully working");
    }); 
})
.catch((err) =>{
    console.error("database cannot be connected!", err);
});