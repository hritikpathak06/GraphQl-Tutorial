const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authentication");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/all").get(isAuthenticated, getAllUser);

module.exports = router;
