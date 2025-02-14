const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Passwords do not match" });
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "Failed",
        message: "User already exists with that email.",
      });
    }

    const newUser = await userRepository.createUser({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "Success",
      data: newUser,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid data. Please check your input.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide email and password",
      });
    }

    const user = await userRepository
      .findUserByEmail(email)
      .select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "Success",
      data: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid email or password.",
    });
  }
};
