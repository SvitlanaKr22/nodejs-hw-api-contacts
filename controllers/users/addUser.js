const { userSchema } = require("../../models/schemas/user");
const { usersService } = require("../../models/service");
const { HttpError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const verificationToken = nanoid();
const { BASE_URL } = process.env;

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
  const avatar = gravatar.url(email);

  const newUser = await usersService.addUser(
    req.body,
    avatar,
    verificationToken
  );

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = addUser;
