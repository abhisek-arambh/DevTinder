const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");


userRouter.get("/user/request/received" , userAuth, async (req , res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status : "accepted",
        }).populate("fromUserId", ["firstName", "lastName", "age", "about", "skills"])
        res.json({
            message: "user fetched successfully",
            data: connectionRequest,
        });

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})

module.exports = userRouter;