const express = require('express');
const authRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
try {
    validateSignUpData(req);
    const {firstName, lastName, emailId, gender, password , age, photoUrl, bio, skills} = req.body;
    const hashedPassward = await bcrypt.hash(password, 10);
    console.log(hashedPassward);

    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      password:hashedPassward,
      age,
      photoUrl,
      bio,
      skills
    });

    await user.save();
    res.send("user added successfully");
} catch (err) {
    res.status(404).send("ERROR :" + err.message);
}
});

authRouter.post("/login", async (req, res) => {

  try{
    const { emailId, password } = req.body;

    const user = await User.findOne({emailId: emailId});
    if (!user){
      throw new Error ("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid){

      const token = await user.getJWT();

      res.cookie("token", token ,{expires: new Date (Date.now() + 8 * 3600000)});
      res.send("login successfull");
    }else{
      throw new Error("Invalid Password");
    }
  }catch (err) {
    res.status(404).send("ERROR :"+ err.message);
  }
});

authRouter.post("/logout" , async (req, res) => {
  try{
    res.cookie("token", null ,{
      expires: new Date (Date.now()),
    });
    res.send("logout successfull");
  }catch(err){
    res.status(404).send("ERROR :"+ err.message);
  }
});

module.exports = authRouter;