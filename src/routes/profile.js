const express = require("express");
const profileRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const{validateEditProfileData} = require("../utils/validation");
const user = require("../models/user");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send(user);
  }catch (err) {
    res.status(404).send("Something went wrong");
  }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Data");
    }
    const logedInUser = req.user;
    
    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));

    await logedInUser.save();
    res.json({
      message: `${logedInUser.firstName}, your profile updated successfully`, 
      user: logedInUser,
    });
  }catch(err){
    res.status(404).send("ERROR :"+ err.message);
  }                            
})

module.exports = profileRouter;