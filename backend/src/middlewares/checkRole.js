const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.checkRole = async (req, res, next) => {

  try {

    const {token} = req.cookies;

    // console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // console.log(decoded);

    const user = await userModel.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};