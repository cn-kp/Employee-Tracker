const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
  },
  console.log(`Connected to the database.`)
);

const question = async () => {
  const userInput = await inquirer.prompt([
    {
      type: "list",
      message: "Pick one of the following options to start the program",
      name: "action",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Update an Employee Managers",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Departments, Roles, or Employees",
        "View the Total Utilized Budget of a Department",
      ],
    },
  ]);
  const { action } = userInput;
  switch (action) {
    case "View all Departments":
      viewDepartments();
      break;
    case "View all Roles":
      viewRoles();
      break;
    case "View all Employees":
      viewEmployees();
      break;
    case "Add a Department":
      addDepartment();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Add an Employee":
      addEmployee();
      break;
    case "Update an Employee Role":
      updateRole();
      break;
    case "Update an Employee Managers":
      updateManager();
      break;
    case "View Employees by Manager":
      viewByManager();
      break;
    case "View Employees by Department":
      viewByDepartment();
      break;
    case "Delete Departments, Roles, or Employees":
      deleteData();
      break;
    case "View the Total Utilized Budget of a Department":
      viewBudget();
      break;
  }
};

const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    question();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    question();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    question();
  });
};

const addDepartment = async () => {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department",
      validate: (input) => {
        if (typeof input == "string") return true;
        else {
          console.log("Please enter the department name!");
          return false;
        }
      },
    },
  ]);
  const { department } = userInput;
  db.query(
    `INSERT INTO department SET ?`,
    { name: department },
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      question();
    }
  );
};

// ---------------------- Adding Role Function ---------------------------- //

const addRole = async () => {
  const userInput = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the role?",
      validate: (input) => {
        if (typeof input == "string") return true;
        else {
          console.log("Please enter the department name!");
          return false;
        }
      },
    },
    {
      name: "salary",
      type: "input",
      message: "What is the Salary?",
      // validate: (input) => {
      //   if (typeof input == "number") return true;
      //   else {
      //     console.log("Please enter the salary amount!");
      //     return false;
      //   }
      // },
    },
    {
      name: "department_id",
      type: "input",
      message: "What is the Department ID?",
      // validate: (input) => {
      //   if (typeof input == "number") return true;
      //   else {
      //     console.log("Please enter the department id!");
      //     return false;
      //   }
      // },
    },
  ]);
  const { title, salary, department_id } = userInput;
  db.query(
    `INSERT INTO role SET ?`,
    { title: title, salary: salary, department_id: department_id },
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      question();
    }
  );
};

// ---------------------- Adding Employee Function ---------------------------- //

const addEmployee = async () => {
  const userInput = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the first name of the employee?",
      validate: (input) => {
        if (typeof input == "string") return true;
        else {
          console.log("Please enter the first name of the employee!");
          return false;
        }
      },
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the last name of the employee?",
      validate: (input) => {
        if (typeof input == "string") return true;
        else {
          console.log("Please enter the first name of the employee!");
          return false;
        }
      },
    },
    {
      name: "roleID",
      type: "input",
      message: "What is the role ID?",
      // validate: (input) => {
      //   if (typeof input == "number") return true;
      //   else {
      //     console.log("Please enter the department id!");
      //     return false;
      //   }
      // },
    },
    {
      name: "managerID",
      type: "input",
      message: "What is the manager ID?",
      // validate: (input) => {
      //   if (typeof input == "number") return true;
      //   else {
      //     console.log("Please enter the department id!");
      //     return false;
      //   }
      // },
    },
  ]);
  const { firstName, lastName,roleID,managerID } = userInput;
  db.query(
    `INSERT INTO employee SET ?`,
    { first_name:firstName, last_name:lastName, role_id:roleID, manager_id:managerID},
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      question();
    }
  );
};

// starts the prompt on load
question();
