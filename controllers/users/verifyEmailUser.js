const { usersService } = require("../../models/service");

const verifyEmailUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await usersService.findOneUser({ verificationToken });

  if (!user) {
    throw HttpError(404);
  }

  const { _id: id } = user;

  const verifyUser = {
    verify: true,
    verificationCode: "",
  };

  await usersService.verifyUser(id, verifyUser);

  res.json({
    message: "Verify success",
  });
};

module.exports = verifyEmailUser;
