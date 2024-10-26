const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async(req,res)=> {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            //CryptoJS.AES.encrypt(req.body.password,process.env.SECRET);
            password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString(),
        });
        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //login fuction

    loginUser: async(req,res) => {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            !user && res.status(401).json("Wrong Login Details");
            // giải mã đẻ có thể đăng nhập tài khoản
            const decrypytedpass = CryptoJS.AES.decrypt(user.password,process.env.SECRET);
            const depassword = decrypytedpass.toString(CryptoJS.enc.Utf8);

            depassword !== req.body.password && res.status(401).json("Wrong Password");
            const {password, __v,createAt,...others} = user._doc;

            const userToken = jwt.sign( {
                id:user._id,isAdmin:user.isAdmin,isAgent:user.isAgent
            },process.env.JWT_SEC,{expiresIn:"1h"}
                
            )
            res.status(200).json({...others,userToken});

        } catch (error) {
            res.status(500).json(error)
        }
    },

}