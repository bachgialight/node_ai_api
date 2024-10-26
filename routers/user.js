const router = require("express").Router();

const userController = require("../cotrollers/userController");
const { verifyAndAuthorization,verifyToken,verifyAndAdmin} = require("../middleware/verifyTokens");

//UPDATE USER

router.put("/:id",verifyAndAuthorization, userController.updateUser);

//DELETE USER

router.delete("/:id",verifyAndAuthorization, userController.deleteUser);

//GET USER

router.get("/:id",verifyAndAuthorization, userController.getUser);

//GET ALL USER

router.get("/",verifyAndAdmin, userController.getAllUser);

module.exports = router