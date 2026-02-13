const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 4,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ("email is not valid");
                }else{
                    return value;
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value, {
                    minLength: 8, 
                    minLowercase: 1,
                    minUppercase: 1, 
                    minNumbers: 1, 
                    minSymbols: 1})){
                    throw new Error ("password is not strong enough");
                }else{
                    return value;
                }
            }
        },gender: {
            validate(value){
                if(!["male" , "female" , "others"].includes(value)){
                    throw new Error("gender is not valid");
                }else{
                    return (value);
                }
            },
            type: String,
            required: true,
            trim: true,
        },age: {
            type: Number,
            min :18,
            max : 70,
            // required: true,
        },photoUrl: {
            default:"https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
            type: String,
            required: true,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error ("photoUrl is not valid");
                }else{
                    return value;
                }
            },
        },bio: {
            type: String,
            // required: true,
        },skills: {
            type: [String],
            required: true,
        }
    },
    { timestamps: true }
);

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = jwt.sign({userId: user._id}, "secretKey", {expiresIn: "1d"});
    return token; 
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordhash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordhash);
    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);