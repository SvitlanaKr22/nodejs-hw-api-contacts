const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.updateStatusContact);

module.exports = router;

//PATCH  - http://localhost:3000/api/contacts/6468fdfea8612f4344b19479/favorite
