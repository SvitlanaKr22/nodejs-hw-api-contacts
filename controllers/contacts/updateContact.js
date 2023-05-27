const { HttpError } = require("../../helpers");
const Joi = require("joi");
const contactsService = require("../../models/service");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const contact = await contactsService.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(contact);
};

module.exports = updateContact;
