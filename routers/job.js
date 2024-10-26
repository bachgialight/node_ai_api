const router = require("express").Router();

const jobController = require("../cotrollers/jobController");
const { verifyAndAuthorization,verifyToken,verifyAndAdmin} = require("../middleware/verifyTokens");

//POST JOB
router.post("/",verifyAndAdmin, jobController.createJob);


//UPDATE JOB

router.put("/:id",verifyAndAdmin, jobController.updateJob);

//DELETE JOB

router.delete("/:id",verifyAndAdmin, jobController.deleteJob);

// //GET JOB

router.get("/:id", jobController.getJob);

// //GET ALL JOB

router.get("/",jobController.getAllJob);
//SEARCH ALL JOB
router.get("/search/:key",jobController.searchJobs);


module.exports = router