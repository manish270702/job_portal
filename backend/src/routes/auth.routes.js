const express = require("express")
const { register, login, getUserRole, profile, updateProfile } = require("../controllers/auth.controller")
const { checkRole } = require("../middlewares/checkRole")
const upload = require("../middlewares/multer")

const router = express.Router()

router.post("/", register)
router.post("/login", login)
router.get("/profile", checkRole, profile)
router.patch("/updateprofile", checkRole, upload.single("resumeUrl"), updateProfile)


module.exports = router