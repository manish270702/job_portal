const express = require("express")
const { register, login, getUserRole } = require("../controllers/auth.controller")
const { checkRole } = require("../middlewares/checkRole")

const router = express.Router()

router.post("/",register)
router.post("/login",login)
router.get("/login",checkRole,getUserRole)

module.exports = router