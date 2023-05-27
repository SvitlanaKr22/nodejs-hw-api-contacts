const contactsService = require("../../models/service");

const listContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

module.exports = listContacts;
