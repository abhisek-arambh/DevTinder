const express = require('express');
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");

requestRouter.post("/userConnectionRequest", userAuth, async (req , res) => {
  try{
    const user = req.user;
    console.log("sending a connection request");

    res.send(user.firstName +" "+ "sent a connection request");
  }catch(err){
    res.status(404).send("ERROR :"+ err.message);
  }
});

module.exports = requestRouter;