const userService = require("../services/userService");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const { newUser, token } = await userService.signupService({
      name,
      email,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      status: "Success",
      data: newUser,
      token,
    });
  } catch (err) {
    res.status(err.statusCode || 400).json({
      status: "Failed",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : err.userMessage || "Invalid data. Please check your input.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginService({ email, password });

    res.status(200).json({
      status: "Success",
      data: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(err.statusCode || 401).json({
      status: "Failed",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Invalid email or password.",
    });
  }
};
