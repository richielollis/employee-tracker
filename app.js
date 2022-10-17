const db = require("./db/connection");
const inquirer = require("inquirer");
const consTable = require("console.table");
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./utils/prompts");

async function promptUser() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "init",
      choices: [
        "View All Departments",
        "Add Department",
        "View All Roles",
        "Add Role",
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
      ],
    })
    .then(async (answer) => {
      switch (answer.init) {
        case "View All Departments":
          await getAllDepartments();
          promptUser();
          break;
        case "View All Roles":
          await getAllRoles();
          promptUser();
          break;
        case "View All Employees":
          await getAllEmployees();
          promptUser();
          break;
        case "Add Department":
          await addDepartment();
          promptUser();
          break;
        case "Add Role":
          await addRole();
          promptUser();
          break;
        case "Add Employee":
          await addEmployee();
          promptUser();
          break;
        case "Update Employee Role":
          await updateEmployeeRole();
          promptUser();
          break;
        default:
          console.log("Invalid selection.");
          promptUser();
      }
    });
}

promptUser();
