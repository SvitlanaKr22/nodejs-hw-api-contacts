const { contactsService } = require("../../models/service");

const listContacts = async (req, res) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await contactsService.listContacts(skip, limit);
  res.status(200).json(contacts);
};

module.exports = listContacts;
