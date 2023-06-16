const { verificationSchema } = require("../../models/schemas/user");
const { HttpError, sendEmail } = require("../../helpers");
const { usersService } = require("../../models/service");
const { BASE_URL } = process.env;

const reVerifyEmail = async (req, res, next) => {
  const { error } = verificationSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required field email");
  }

  const { email } = req.body;

  const user = await usersService.findEmailUser(email);

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email sent",
  });
};

module.exports = reVerifyEmail;
