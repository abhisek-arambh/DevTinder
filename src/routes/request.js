const express = require("express");
const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:touserId", userAuth, async (req , res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.touserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "Invalid status type: " + status,
      })
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({
        message: "User not found",
      })
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId , toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ],
    });
    if(existingConnectionRequest){
      return res.status(400).json({
        message: "connection request is already sent",
      })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: req.user.firstName + " is " + status + " in " + toUser.firstName,
      data,
    });
  }catch(err){
    res.status(400).send("ERROR :"+ err.message);
  }

})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req , res) => {
  try{
    const logedInUser = req.user;
    const {status , requestId} = req.params;

    const allowedStatus = ["accepted" , "rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "Invalid status type:" +status,
      })
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: logedInUser._id,
      status: "interested",
    })
    if(!connectionRequest){
      return res.status(404).json({
        message: "Connection request not found",
      })
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({message: "Connection request " + status, data}); 

  }catch(err){
    res.status(400).send("ERROR :"+ err.message);
  }
})

requestRouter.get("/requests/me", userAuth, async (req , res) => {
  try{}
})

module.exports = requestRouter; 