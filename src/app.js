require("dotenv").config();
const express = require("express");
const connectDb = require ("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
try {
    validateSignUpData(req);
    const {firstName, lastName, emailId, gender, password} = req.body;
    const hashedPassward = await bcrypt.hash(password, 10);
    console.log(hashedPassward);

    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      password:hashedPassward
    });

    await user.save();
    res.send("user added successfully");
} catch (err) {
    res.status(404).send("ERROR :" + err.message);
}
});

app.post("/login", async (req, res) => {

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
})

app.get("/profile", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send(user);
  }catch (err) {
    res.status(404).send("Something went wrong");
  }
})

app.post("/userConnectionRequest", userAuth, async (req , res) => {
  try{
    const user = req.user;
    console.log("sending a connection request");

    res.send(user.firstName +" "+ "sent a connection request");
  }catch(err){
    res.status(404).send("ERROR :"+ err.message);
  }
})

connectDb()
  .then(() => {
    console.log("database is connected successsfully");
    app.listen(7777, () => {
      console.log("server is sucessfully working");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected!", err);
  });