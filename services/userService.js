// userService.js
const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

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
    throw new Error("Passwords do not match.");
  }

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with that email.");
  }

  const newUser = await userRepository.createUser({
    name,
    email,
    password,
    passwordConfirm,
  });

  const token = signToken(newUser._id);

  return { newUser, token };
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  signupService,
};
