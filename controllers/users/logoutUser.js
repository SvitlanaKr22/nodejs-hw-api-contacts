const { usersService } = require("../../models/service");
const { HttpError } = require("../../helpers");

const logoutUser = async (req, res, next) => {
  const { _id: id } = req.user;
  const user = await usersService.findUser(id);
  if (!user) throw HttpError(401);
  await usersService.deleteToken(id);
  res.status(204).end();
};

module.exports = logoutUser;
