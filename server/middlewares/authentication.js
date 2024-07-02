const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { userToken } = req.cookies;

    if (!userToken) {
      return res.status(401).json({
        success: false,
        message: "Please login to continue",
      });
    }

    // console.log("User Toekn: ",userToken)

    const decoded = jwt.verify(userToken, "ANANBAHGGFADARDFRAA");
    // console.log("Decoded data: ",decoded)
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found In The database",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};