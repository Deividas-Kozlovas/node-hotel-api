const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Function to generate a token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Signup route
exports.signup = async (req, res) => {
  try {
    // Ensure email doesn't already exist
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists",
      });
    }

    // Create a new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // Create a token for the new user
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "Success",
      data: newUser,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Login route
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // Check if user exists and if password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    // Create token
    const token = signToken(user._id);

    // Respond with user info and token
    res.status(200).json({
      status: "Success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};
