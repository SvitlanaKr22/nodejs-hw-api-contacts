const Contact = require("../schemas/contact");

async function listContacts(query, owner) {
  const { page = 1, limit = 4, favorite } = query;
  const skip = (page - 1) * limit;

  return favorite === undefined
    ? await Contact.find({ owner }, null, { skip, limit })
    : await Contact.find({ owner, favorite });
}

async function getContactById(contactId) {
  const result = await Contact.findById(contactId);
  return result;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
}

async function addContact(data) {
  const contact = new Contact({
    ...data,
  });
  const result = await contact.save();
  return result;
}

async function updateContact(contactId, data) {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...data },
    { new: true }
  );
  return result;
}

async function updateStatusContact(contactId, body) {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
