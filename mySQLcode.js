var mysql = require("mysql");
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: process.env.DB_PORT,

  user: process.env.DB_USER,

  password: process.env.DB_PASS,
  database: "employeedb"
});

connection.connect(function(err) {
  if (err) throw err;
});

let allEmployees = [];
let allRoles = [];
let allManagers = [];

displayEmployees = () => {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      allEmployees.push(res[i].first_name + " " + res[i].last_name);
    }
    console.table(res);
    startApp();
  });
};

displayEmployeesDept = () => {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      allRoles.push(res[i].role_id);
    }
    console.table(res);
    startApp();
  });
};

displayEmployeesManager = () => {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      allRoles.push(res[i].manager_id);
    }
    console.table(res);
    startApp();
  });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "selectEmployeeFirstName"
      }
    ])
    .then(data => {
      addEmployeeLastName();
    });
};

addEmployeeLastName = data => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "selectEmployeeLastName"
      }
    ])
    .then(() => {
      addEmployeeRole();
    });
};

addEmployeeRole = data => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the employee's role?",
        name: "selectEmployeeRole",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer"
        ]
      }
    ])
    .then(() => {
      addEmployeeManager();
    });
};

addEmployeeManager = data => {
  connection.query("SELECT * FROM employees", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      allManagers.push(res[i].manager_id);
    }
  });
  inquirer.prompt([
    {
      type: "input",
      message: "Who is the employee's manager?",
      name: "addEmployeeManager"
    }
  ]);
};

removeEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select the employee to remove.",
        name: "removeEmployee",
        choices: []
      }
    ])
    .then(() => {
      connection.query("DELETE * FROM employees WHERE", function(err, res) {});
    });
  startApp();
};

updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the role's title",
        name: "updateRole"
      }
    ])
    .then(() => {
      addRole();
    });
  startApp();
};

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the new role to add.",
        name: "addRole"
      }
    ])
    .then(() => {
      addRole();
    });
  connection.query(
    "INSERT INTO roles",
    {
      id: ``,
      title: ``,
      salary: ``,
      department_id: ``
    },
    function(err, res) {
      if (err) throw err;
    }
  );
  startApp();
};

removeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the  role to remove.",
        name: "removeRole"
      }
    ])
    .then(() => {
      addRole();
    });
  connection.query("DELETE * FROM roles WHERE", function(err, res) {
    if (err) throw err;
  });
  startApp();
};

updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee would you like to update the role?",
        name: "selectEmployeeForRole",
        choices: []
      }
    ])
    .then(data => {
      var query = "UPDATE * FROM employees WHERE";
      connection.query(
        query,
        { selectEmployeeForRole: employees.role_id },
        function(err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
      startApp();
    });
};

updateEmployeeManager = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee would you like to update the manager?",
        name: "selectEmployeeForRole",
        choices: []
      }
    ])
    .then(data => {
      var query = "UPDATE * FROM employees WHERE";
      connection.query(
        query,
        { selectEmployeeForRole: employees.manager_id },
        function(err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
      startApp();
    });
};

viewAllRoles = () => {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
};

endProgram = () => {
  connection.end();
};

module.exports = {
  displayEmployees: displayEmployees,
  displayEmployeesDept: displayEmployeesDept,
  displayEmployeesManager: displayEmployeesManager,
  addEmployee: addEmployee,
  removeEmployee: removeEmployee,
  updateEmployeeRole: updateEmployeeRole,
  addRole: addRole,
  removeRole: removeRole,
  updateEmployeeRole: updateEmployeeRole,
  updateEmployeeManager: updateEmployeeManager,
  displayRoles: displayRoles,
  endProgram: endProgram
};
