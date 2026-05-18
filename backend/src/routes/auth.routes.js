const express = require("express")
const { register, login, getUserRole, profile, updateProfile } = require("../controllers/auth.controller")
const { checkRole } = require("../middlewares/checkRole")

const router = express.Router()

router.post("/",register)
router.post("/login",login)
router.get("/profile",checkRole,profile)
router.patch("/updateprofile",checkRole,updateProfile)


module.exports = router