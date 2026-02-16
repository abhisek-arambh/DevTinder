const express = require("express");
const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/request/send/:status/:touserId", userAuth, async (req , res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.touserId;
    const status = req.params.status;

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "connection request sent successfully",
      data,
    });
  }catch(err){
    res.status(400).send("ERROR :"+ err.message);
  }

})

module.exports = requestRouter; 