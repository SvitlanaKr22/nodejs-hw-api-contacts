const { HttpError } = require("../helpers");
const Joi = require("joi");
const contactsService = require("../models/contacts");
const { controllerWrapper } = require("../decorators/controllerWrapper");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const listContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

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

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
};
