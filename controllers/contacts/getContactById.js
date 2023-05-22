const { HttpError } = require("../../helpers");
const contactsService = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
