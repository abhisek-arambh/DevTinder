const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();    



const connectDb = async() =>{
    await mongoose.connect(
        process.env.mongoBD,
    );
};

module.exports = connectDb;
