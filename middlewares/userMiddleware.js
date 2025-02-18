const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const userService = require("../services/userService");

exports.verifyToken = async (token) => {
  try {
    const response = await axios.get("/user/verify-token", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Token verification failed:",
      error.response?.data || error.message
    );
    return null;
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in. Please log in to get access.",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await userService.findUserById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "Failed",
        message: "The user belonging to this token no longer exists.",
      });
    }

    if (currentUser.changePasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "Failed",
        message: "User changed password after token was issued.",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: err.message || "Error authenticating user.",
    });
  }
};
