const db = require("../db/connection");
const inquirer = require("inquirer");

// empty arrays for lists
let departmentArray = [];
let roleArray = [];
let employeeArray = [];
let managerArray = [];

// functions that create the arrays needed for the functions that will take in user input in command line
// departments, roles, employee's, and manager's are put into their respected arrays for use later
async function departmentList() {
  departmentArray = [];
  const sql = `SELECT * FROM department`;

  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i].id;
        let dep = rows[i].name;
        departmentArray.push(`${id}. ${dep}`);
      }
    })
    .catch(console.log);
}

async function roleList() {
  roleArray = [];
  const sql = `SELECT * FROM role`;

  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i].id;
        let role = rows[i].title;
        roleArray.push(`${id}. ${role}`);
      }
    })
    .catch(console.log);
}

async function managerList() {
  const sql = `SELECT CONCAT (first_name, ' ', last_name) AS full_name, employee.id, manager_id FROM employee`;
  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].manager_id === null) {
          let id = rows[i].id;
          let fullName = rows[i].full_name;
          managerArray.push(`${id}. ${fullName}`);
        }
      }
    });
}

async function employeeList() {
  const sql = `SELECT CONCAT (first_name, ' ', last_name) AS full_name, employee.id, manager_id FROM employee`;
  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i].id;
        let fullName = rows[i].full_name;
        employeeArray.push(`${id}. ${fullName}`);
      }
    });
}

// functions needed to talk to mysql and present user with proper information that they ask for
async function getAllDepartments() {
  const sql = `SELECT * FROM department`;

  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        id = rows;
        departmentArray.push(rows[i]);
      }
      console.table(rows);
    })
    .catch(console.log);
}

async function getAllRoles() {
  const sql = `SELECT role.*, department.name 
    AS department_name 
    FROM role LEFT JOIN department 
    ON role.department_id = department.id`;

  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
    })
    .catch(console.log);
}

async function getAllEmployees() {
  const sql = `SELECT e.id, e.first_name, e.last_name, 
  role.title, role.salary, department.name AS department,
  CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e 
  LEFT JOIN employee m ON m.id = e.manager_id
  INNER JOIN role ON e.role_id = role.id
  INNER JOIN department ON role.department_id = department.id`;

  await db
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
    })
    .catch(console.log);
}

async function addDepartment(department) {
  await inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "department",
    })
    .then(async (input) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const params = input.department;
      await db
        .promise()
        .query(sql, params)
        .then(([rows]) => {
          console.log("Department Added");
        })
        .catch(console.log);
    });
}

async function addRole(role) {
  await departmentList();
  await inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role",
      },
      {
        type: "number",
        message: "What is the salary of the role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department does the role belong to?",
        name: "department",
        choices: departmentArray,
      },
    ])
    .then(async (answers) => {
      const value = answers.department.split(".");
      const dep = value[0];

      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
      const params = [answers.role, answers.salary, dep];
      await db
        .promise()
        .query(sql, params)
        .then(([rows]) => {
          console.log("Role Added");
        })
        .catch(console.log);
    });
}

async function addEmployee() {
  await managerList();
  await roleList();
  await inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: roleArray,
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager",
        choices: managerArray,
      },
    ])
    .then(async (answers) => {
      const val1 = answers.role.split(".");
      const role = val1[0];
      const val2 = answers.manager.split(".");
      const manager = val2[0];

      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [answers.first, answers.last, role, manager];
      await db
        .promise()
        .query(sql, params)
        .then(([rows]) => {
          console.log("Employee Added");
        })
        .catch(console.log);
    });
}

async function updateEmployeeRole() {
  await employeeList();
  await roleList();
  await inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role would you like to update?",
        name: "employee",
        choices: employeeArray,
      },
      {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        name: "role",
        choices: roleArray,
      },
    ])
    .then(async (answers) => {
      const val1 = answers.employee.split(".");
      const employee = val1[0];
      const val2 = answers.role.split(".");
      const role = val2[0];

      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
      const params = [role, employee];

      await db
        .promise()
        .query(sql, params)
        .then(([rows]) => {
          console.log("Employee Updated");
        })
        .catch(console.log);
    });
}

// exporting functions to be called in app.js
module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
