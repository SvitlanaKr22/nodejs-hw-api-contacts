const { userSchema } = require("../../models/schemas/user");
const { usersService } = require("../../models/service");
const { HttpError } = require("../../helpers");
const addUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  const { email } = req.body;
  const user = await usersService.findEmailUser(email);

  if (user) {
    throw HttpError(409);
  }

  const newUser = await usersService.addUser(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = addUser;
