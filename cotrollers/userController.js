const User = require("../models/user"); 
const CryptoJS = require("crypto-js");

module.exports = {
    // cập nhật thông tin người dùng
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try {
            console.log("Updating user with ID:", req.params.id); // Kiểm tra ID người dùng
            const UpdateUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            console.log("Updated user data:", UpdateUser);
            if (!UpdateUser) return res.status(404).json("User not found");
    
            const { password, __v, createAt, ...others } = UpdateUser._doc;
            res.status(200).json({ ...others });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // xóa người dùng
    deleteUser: async (req,res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account successfully Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // lấy thông tin người dùng
    getUser: async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            const {password,__v,createAt,updateAt,...userData} = user._doc;
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllUser: async (req,res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
}
