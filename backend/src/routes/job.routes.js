const express = require("express")
const { checkRole } = require("../middlewares/checkRole")
const { createjob, showjobs } = require("../controllers/job.controller")
const router = express.Router()

router.post("/",checkRole,createjob)
router.get("/",checkRole,showjobs)

module.exports = router