const { contactsService } = require("../../models/service");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await contactsService.listContacts(req.query, owner);
  res.status(200).json(contacts);
};

module.exports = listContacts;
