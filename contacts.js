const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const items = await listContacts();
  const result = items.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const items = await listContacts();
  const index = items.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = items.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const items = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  items.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
