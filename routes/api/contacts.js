const express = require("express");
const Joi = require("joi");
const contactsService = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contact = await contactsService.updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
