const router = require("express").Router();
const authCotroller = require("../cotrollers/authCotroller");

router.post("/register",authCotroller.createUser);

router.post("/login",authCotroller.loginUser)
 

module.exports = router