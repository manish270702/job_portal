const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { checkRole } = require('../middlewares/checkRole')


exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const isUser = await userModel.findOne({ email })

        if (isUser) {
            return res.status(409).json({
                message: "User already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )

        res.cookie("token", token)

        res.status(201).json({
            message: "User created successfully",
            user
        })

        // res.redirect("/home")

        

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: error.message
        })

    }

}

exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const isuser = await userModel.findOne({ email })
        if (!isuser) {
            return res.status(402).json({
                message: "something went wrong"
            })
        }

        const ispassword = await bcrypt.compare(password, isuser.password,)

        if (!ispassword) {
            return res.status(403).json({
                message: "something went wrong"
            })
        }
        const token = jwt.sign(
            { email: isuser.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )
        res.cookie("token", token)

        res.status(201).json({
            message: "user login successsfully",
            isuser
        })

        // res.redirect("/home")

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }


}


exports.getUserRole = (req, res) => {
    const role = req.user.role;

    res.status(200).json({
        role,
    });
};