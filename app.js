var inquirer = require("inquirer");
var MySQLcode = require("./MySQLcode.js");

startApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "startMessage",
        choices: [
          "View all Employees",
          "View all Employees by Department",
          "View all Employees by Manager",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View all Roles",
          "Add Role",
          "Remove Role"
        ]
      }
    ])
    .then(data => {
      switch (data.startMessage) {
        case "View all Employees":
          MySQLcode.displayEmployees();
          break;

        case "View all Employees by Department":
          MySQLcode.displayEmployeesDept();
          break;

        case "View all Employees by Manager":
          MySQLcode.displayEmployeesManager();
          break;

        case "Add Employee":
          MySQLcode.addEmployeeData();
          break;

        case "Remove Employee":
          MySQLcode.removeEmployee();
          break;

        case "Update Employee Role":
          MySQLcode.updateEmployeeRole();
          break;

        case "Update Employee Manager":
          MySQLcode.updateEmployeeManager();
          break;

        case "View all Roles":
          MySQLcode.displayRoles();
          break;

        case "Add Role":
          MySQLcode.addRoleData();
          break;

        case "Remove Role":
          MySQLcode.addRoleData();
          break;

        case "End Program":
          MySQLcode.endProgram();
          break;
      }
    });
};

startApp();

let firstName;
let lastName;
let employeeRole;
let employeeManager;

checkInput = name => {
  return name !== "";
};

addEmployeeData = answers => {
  inquirer
    .prompt([
      {
        message: "What is the Employee's first name?",
        type: "input",
        name: "firstName",
        validate: checkInput
      },
      {
        message: "What is the Employee's last name?",
        type: "input",
        name: "lastName",
        validate: checkInput
      },
      {
        message: "What is the Employee's role title?",
        type: "input",
        name: "employeeRole",
        validate: checkInput
      },
      {
        message: "Who is the Employee's manager?",
        type: "input",
        name: "employeeManager",
        validate: checkInput
      }
    ])
    .then(answers => {
      firstName = answers.firstName;
      lastName = answers.lastName;
      employeeRole = answers.employeeRole;
      employeeManager = answers.employeeManager;
    });
};
