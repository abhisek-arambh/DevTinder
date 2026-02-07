const express = require("express");

const app = express();

app.use("/getUserData" , (req , res) => {
    throw new error("dsfgdhjk");
        res.send("Deleted a User");
});

app.use("/" , (err , req , res , next) =>{
    if(err) {
        res.status(500).send("something went wrong");
    }
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});
