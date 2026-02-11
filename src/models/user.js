const mongoose = require('mongoose');

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
        },
        password: {
            type: String,
            required: true,
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
            required: true,
        },photoUrl: {
            default:"https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
            type: String,
            required: true,
        },bio: {
            type: String,
            required: true,
        },skills: {
            type: [String],
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);