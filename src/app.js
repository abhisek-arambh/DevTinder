const express = require("express");

const app = express();

app.use("/admin" , (req , res , next) => {
    console.log("admin authorisation is getting checked");
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Admin is not athorised");
    }else{
        next();
    }
})

app.use("/admin/GetAllData" , (req , res) => {
        res.send("All data is clear");
});

app.use("/admin/DeleteUser" , (req , res) => {
        res.send("Deleted a User");
});

app.listen(7777, () =>{
    console.log("server is sucessfully working");
});
