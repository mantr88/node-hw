const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const items = await listContacts();
    const result = items.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const items = await listContacts();
    const index = items.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = items.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const items = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    items.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
