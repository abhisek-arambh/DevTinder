const express = require("express");

const app = express();

const{adminAuth , userAuth} = require("./middlewares/auth");

app.use("/admin" , adminAuth);
app.use("/user" , userAuth);

app.use("/user/GetAllData" , (req , res) => {
        res.send("user data is clear");
});

app.use("/user/DeleteUser" , (req , res) => {
        res.send("Deleted a User");
});

app.use("/admin/GetAllData" , (req , res) => {
        res.send("All data is clear");
});

app.use("/admin/DeleteUser" , (req , res) => {
        res.send("Deleted a User");
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});
