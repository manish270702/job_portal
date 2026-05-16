const express  = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes')
const jobRoutes = require('./routes/job.routes')
const connectToDb = require('./db/db')
require('dotenv').config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

connectToDb()

app.use("/api/auth",authRoutes)
app.use("/api/jobs",jobRoutes)


module.exports = app