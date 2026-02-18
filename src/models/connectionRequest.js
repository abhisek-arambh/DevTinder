const mongoose =  require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: ["interested" , "ignored", "accepted", "rejected"],
            message: `{VALUE} status is not valid`,
        }
    }
    
},
{ 
    timestamps: true,
});

connectionRequestSchema.index({
    fromUserId: 1, 
    toUserId: 1,
    unique:true
});

connectionRequestSchema.pre("save", function(){
//   const connectionRequest = this;
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("fromUserId and toUserId cannot be same");
    }
});


const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;