// =============CLI with yargs=========================
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// ====================================================

const { program } = require("commander");

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

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "vza2RIzNGIwutCVCs4mCL" });
// invokeAction({
//   action: "add",
//   name: "Kennedy Anton",
//   email: "kertis.Cras@nonenimMauris.net",
//   phone: "(321) 451-7038",
// });
// invokeAction({ action: "remove", id: "2WVPwIk20urQ8crQ8sVC0" });

// =============CLI with yargs=========================

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// console.log(argv);
// invokeAction(argv);

// !!!For use yargs, you should to transform ID to string in function when you needed ID.
// ========================================================

program
  .option("--a, --action, <type>")
  .option("--id, <type>")
  .option("--n, --name, <type>")
  .option("--e, --email, <type>")
  .option("--p, --phone, <type>");

program.parse();

const options = program.opts();

invokeAction(options);
