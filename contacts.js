const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");

// console.log(__dirname);

const contactsPath = path.join(__dirname, "/db/contacts.json");
// console.log(contactsPath);

// // TODO: задокументувати кожну функцію
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const items = await listContacts();
  const result = items.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
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
  // ...твій код. Повертає об'єкт доданого контакту.
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
