const express = require("express");

const app = express();

app.use("/admin/GetAllData" , (req , res , next) => {
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if (isAdminAuthorised){
        res.send("All data is clear");
    }else{
        res.status(401).send("Admin is not atuthorised");
    }
});

app.use("/admin/DeleteUser" , (req , res , next) => {
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if (isAdminAuthorised){
        res.send("Deleted a User");
    }else{
        res.status(401).send("Admin is not atuthorised");
    }
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});
