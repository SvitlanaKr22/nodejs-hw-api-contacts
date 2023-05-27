const Joi = require("joi");
const { HttpError } = require("../../helpers");
const contactsService = require("../../models/service");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

module.exports = addContact;
