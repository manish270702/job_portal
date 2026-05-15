const express = require("express")
const { checkRole } = require("../middlewares/checkRole")
const { createjob } = require("../controllers/job.controller")
const router = express.Router()

router.post("/",checkRole,createjob)

module.exports = router