const { HttpError } = require("../../helpers");
const contactsService = require("../../models/service");

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json({
    message: "Delete success",
  });
};

module.exports = removeContact;
