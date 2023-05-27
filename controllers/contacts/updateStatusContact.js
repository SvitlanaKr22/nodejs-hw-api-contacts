const { HttpError } = require("../../helpers");
const Joi = require("joi");
const contactsService = require("../../models/service");
//const { model } = require("mongoose");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateStatusContact = async (req, res) => {
  const { body } = req;

  if (!Object.keys(body).length) {
    throw HttpError(400, `missing field favorite`);
  }

  const { contactId } = req.params;

  const { error } = favoriteSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const contact = await contactsService.updateStatusContact(contactId, body);
  if (!contact) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json(contact);
};

module.exports = updateStatusContact;
