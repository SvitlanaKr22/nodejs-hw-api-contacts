const { usersService } = require("../../models/service");
const { HttpError } = require("../../helpers");
const { subscrptSchema } = require("../../models/schemas/user");

const updateUser = async (req, res) => {
  const { error } = subscrptSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: id } = req.user;
  const { subscription } = req.body;

  const { email, subscription: _subscription } =
    await usersService.updateSubscription(id, subscription);

  res.json({ email, _subscription });
};

module.exports = updateUser;
