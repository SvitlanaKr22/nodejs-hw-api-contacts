const addUser = require("./addUser");
const verifyEmailUser = require("./verifyEmailUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const currentUser = require("./currentUser");
const updateUser = require("./updateUser");
const updateAvatar = require("./updateAvatar");
const reVerifyEmail = require("./reVerifyEmail");

const { controllerWrapper } = require("../../decorators/controllerWrapper");

module.exports = {
  addUser: controllerWrapper(addUser),
  loginUser: controllerWrapper(loginUser),
  logoutUser: controllerWrapper(logoutUser),
  currentUser: controllerWrapper(currentUser),
  updateUser: controllerWrapper(updateUser),
  updateAvatar: controllerWrapper(updateAvatar),
  verifyEmailUser: controllerWrapper(verifyEmailUser),
  reVerifyEmail: controllerWrapper(reVerifyEmail),
};
