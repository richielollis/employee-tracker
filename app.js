const db = require("./db/connection");
const inquirer = require("inquirer");
const consTable = require("console.table");
const { getAllDepartments } = require("./utils/prompts");

async function promptUser() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "init",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "And update an employee role",
      ],
    })
    .then(async (answer) => {
      switch (answer.init) {
        case "View all departments":
          await getAllDepartments();
          promptUser();
          break;
        default:
          console.log("Invalid selection.");
          promptUser();
      }
    });
}

promptUser();
