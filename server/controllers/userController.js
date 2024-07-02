const { generateToken } = require("../helpers/generateToken");
const User = require("../models/userModel");

// **********************************// REST API**********************************
exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      return res.json({
        success: false,
        message: "Please Fill Out All The Fields",
      });
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({
        success: false,
        message: `${email} already Exists In The Database`,
      });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    return res.json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please Fill Out All The Fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Does Not Exists",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = await generateToken(user);
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.json({
      success: true,
      message: "User LoggedIn Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
      success: true,
      message: "User Fetched Successfully",
      users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};

// GRAPHQL API************************************
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    return res.json(user);
  } catch (error) {
    return res.json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};

exports.createUserByGraphql = async (firstName, lastName, email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};
