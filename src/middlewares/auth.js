const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid");
        }
        const decodeObj = await jwt.verify(token, "secretKey");
        const{userId} = decodeObj;
        const user = await User.findById(userId);
        if(!user){
            throw new Error("Unauthorised");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("Error: " + err.message);
    }
}
module.exports = {
    userAuth,
    mo
}