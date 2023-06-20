// =============CLI with yargs=========================
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// ====================================================

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.log(listContacts);

    case "get":
      const getContactById = await contacts.getContactById(id);
      return console.log(getContactById);

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.log(addContact);

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// =============CLI with yargs=========================

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// console.log(argv);
// invokeAction(argv);

// !!!For use yargs, you should to transform ID to string in function when you needed ID.
// ========================================================

invokeAction(argv);
