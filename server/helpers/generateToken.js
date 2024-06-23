const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    { _id: user._id }, // Include the user's ID in the token payload
    "ANANBAHGGFADARDFRAA",
    { expiresIn: "10d" } // 10 days expiration, adjust as needed
  );
};
