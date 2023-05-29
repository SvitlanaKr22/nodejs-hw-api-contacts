const { usersService } = require("../../models/service");
const { HttpError } = require("../../helpers");

const currentUser = async (req, res, next) => {
  const { _id: id, email, subscription } = req.user;

  const user = await usersService.findUser(id);
  if (!user) {
    res.status(401).json({
      message: "Not authorized",
    });
    throw HttpError(401);
  }
  res.status(200).json({ email, subscription });
};

module.exports = currentUser;
