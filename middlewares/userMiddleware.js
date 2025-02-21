const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const userService = require("../services/userService");
const AppError = require("../utils/appError");

exports.validateUser = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError("Please fill in all fields", 400));
  }

  next();
};

// exports.verifyToken = async (token) => {
//   try {
//     const response = await axios.get("/user/verify-token", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Token verification failed:",
//       error.response?.data || error.message
//     );
//     throw new AppError(
//       "Token verification failed. Please check the token.",
//       401
//     );
//   }
// };

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
      return next(
        new AppError("You are not logged in. Please log in to get access.", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await userService.findUserById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    if (currentUser.changePasswordAfter(decoded.iat)) {
      return next(
        new AppError("User changed password after token was issued.", 401)
      );
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError(err.message || "Error authenticating user.", 401));
  }
};
