const express = require("express");

const app = express();

app.use("/getUserData" , (req , res) => {
    try{
        throw new error("dsfgdhjk");
        res.send("Deleted a User");
    }catch (err){
        res.status(500).send("something went wrong");
    }
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});
