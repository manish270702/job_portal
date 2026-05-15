const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.checkRole = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const decoded = jwt.verify(token, "process.env.JWT_SECRET");

    const user = await userModel.findOne({
      email: decoded,
    });

    if (!user) {
      return res.status(404).json({
        message: "invalid token",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};