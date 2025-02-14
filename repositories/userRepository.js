const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
