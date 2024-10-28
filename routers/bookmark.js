const router = require("express").Router();

const bookmarkCotroller = require("../cotrollers/bookmarkCotroller");
const { verifyAndAuthorization,verifyToken,verifyAndAdmin} = require("../middleware/verifyTokens");

//CREATE BOOKMARK

router.post("/",verifyAndAuthorization,bookmarkCotroller.crateBookmark);

//DELETE BOOKMARK

router.delete("/:id", bookmarkCotroller.deleteBookmark);

//GET ALL BOOKMARK

router.get("/:userId",bookmarkCotroller.getBookmark);

module.exports = router