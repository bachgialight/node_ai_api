const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    chatName : {type:String,trim:true},
    isGroupChat : {type:Boolean,default:false},
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    latestMassage: {
        type : mongoose.Schema.ObjectId,
        ref : "Mess",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamp: true });

module.exports = mongoose.model("Chat",chatSchema)