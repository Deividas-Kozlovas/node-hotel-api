const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const findUserById = async (id) => {
  return await userRepository.findUserById(id);
};

const findUserByEmail = async (email) => {
  return await userRepository.findUserByEmail(email);
};

const createUser = async (userData) => {
  return await userRepository.createUser(userData);
};

const signupService = async (userData) => {
  const { name, email, password, passwordConfirm } = userData;

  if (password !== passwordConfirm) {
    throw new AppError("Passwords do not match.", 400);
  }

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists with that email.", 400);
  }

  const newUser = await userRepository.createUser({ name, email, password });

  const token = signToken(newUser._id);

  return { newUser, token };
};

const loginService = async (loginData) => {
  const { email, password } = loginData;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  const token = signToken(user.id);

  return { user, token };
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  signupService,
  loginService,
};
