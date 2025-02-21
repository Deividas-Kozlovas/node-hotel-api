const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
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
