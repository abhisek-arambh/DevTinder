const mongoose = require("mongoose");

const connectDb = async() =>{
    await mongoose.connect(
        "mongodb+srv://abhisek02feb2004singh_db_user:NmjSSxu.h3pYSYA@devtinder.za0jxbj.mongodb.net/"
    );
};

module.exports = connectDb;
