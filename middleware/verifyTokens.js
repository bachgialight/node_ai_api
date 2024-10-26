const authCotroller = require("../cotrollers/authCotroller");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid token"); // Trả về nếu token không hợp lệ
            }
            req.user = user;
            console.log("Decoded user:", user); // In ra đối tượng user đã giải mã
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();  // Cho phép truy cập nếu id khớp hoặc người dùng là admin
        } else {
            res.status(403).json("You are restricted from");
        }
    });
}

const verifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();  // Cho phép truy cập nếu id khớp hoặc người dùng là admin
        } else {
            res.status(403).json("You are restricted from");
        }
    });
}

module.exports = {verifyToken,verifyAndAuthorization,verifyAndAdmin};

