const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = ["firstName", "lastName", "age", "about", "skills"]


userRouter.get("/user/request/received" , userAuth, async (req , res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status : "accepted",
        }).populate("fromUserId",USER_SAFE_DATA)
        res.json({
            message: "user fetched successfully",
            data: connectionRequest,
        });

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})

userRouter.get("/user/connection" , userAuth , async (req , res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ]
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);

        const data = connectionRequest.map((row) =>{
            if(row.fromUserId._id.toString() === row.toUserId._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data});


    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})

module.exports = userRouter;