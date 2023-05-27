const addUser = require("./addUser");
const loginUser = require("./loginUser");
const { controllerWrapper } = require("../../decorators/controllerWrapper");

module.exports = {
  addUser: controllerWrapper(addUser),
  loginUser: controllerWrapper(loginUser),
};
