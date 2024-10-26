const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {type: String,require: true,unique:true},
        email: {type: String,require: true,unique:true},
        password: {type: String,require:true},
        location: {type:String,require:false},
        isAdmin: {type: Boolean,default:false},
        isAgent: {type:Boolean,default:false},
        skills: {type:Array,default:false},
        profile: {type:String,require:true,default: "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"}
    },{timestamps: true}
);
module.exports = mongoose.model("User",UserSchema)