require("dotenv").config();
const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      throw new Error("Invalid Password");
    }else{
      res.send("login successfull");
    }
  }catch (err) {
    res.status(404).send("ERROR :"+ err.message);
  }
})

app.get("/users", async (req, res) => {
  const userEmail = req.body.firstName;
  try {
    const user = await User.findOne({ firstName: userEmail });
    if (!user) {
      return res.status(404).send("user not found");
    } else {
      res.send(user);
    }
    if (user.length === 0) {
      return res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      return res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updateData = req.body;

  try {
    const ALLOUDED_UPDATES = [
      "firstName",
      "lastName",
      "skills",
      "password",
      "age",
      "photoUrl",
      "bio",
    ];
    const isUpdateAllowed = Object.keys(updateData).every((k) =>
      ALLOUDED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    console.log(updatedUser);
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("Update failed:" + err.message);
  }
});

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
