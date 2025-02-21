const userService = require("../services/userService");

exports.signup = async (req, res, next) => {
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
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginService({ email, password });

    res.status(200).json({
      status: "Success",
      data: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    next(err);
  }
};
