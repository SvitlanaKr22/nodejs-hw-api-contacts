const { loginSchema } = require("../../models/schemas/user");
const { usersService } = require("../../models/service");
const { HttpError } = require("../../helpers");

const loginUser = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { email, password } = req.body;

  const user = await usersService.findEmailUser(email);

  if (!user) throw HttpError(401);
  const isPassword = await usersService.controlPassword(
    password,
    user.password
  );
  if (!isPassword) throw HttpError(401);

  const { _id: id, subscription } = user;
  const token = usersService.createToken(id);
  const userWithToken = await usersService.addToken(id, token);
  if (!userWithToken) throw HttpError(404);

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = loginUser;
