const addUser = require("./addUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const currentUser = require("./currentUser");
const updateUser = require("./updateUser");
const { controllerWrapper } = require("../../decorators/controllerWrapper");

module.exports = {
  addUser: controllerWrapper(addUser),
  loginUser: controllerWrapper(loginUser),
  logoutUser: controllerWrapper(logoutUser),
  currentUser: controllerWrapper(currentUser),
  updateUser: controllerWrapper(updateUser),
};
