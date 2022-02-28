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
        "Update an Employee Manager",
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
    case "Update an Employee Manager":
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

// ---------------------- View Department Function ---------------------------- //

const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    question();
  });
};

// ---------------------- View Role Function ---------------------------- //

const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    question();
  });
};

// ---------------------- View Employee Function ---------------------------- //

const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    question();
  });
};

// ---------------------- Adding Department Function ---------------------------- //

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
    },
    {
      name: "department_id",
      type: "input",
      message: "What is the Department ID?",
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
    },
    {
      name: "managerID",
      type: "input",
      message: "What is the manager ID?",
    },
  ]);
  const { firstName, lastName, roleID, managerID } = userInput;
  db.query(
    `INSERT INTO employee SET ?`,
    {
      first_name: firstName,
      last_name: lastName,
      role_id: roleID,
      manager_id: managerID,
    },
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      question();
    }
  );
};

// ---------------------- Update Employee Role Function ---------------------------- //

const updateRole = async () => {
  db.query("SELECT first_name, id FROM employee", async (err, results) => {
    if (err) throw err;
    else {
      const employeeList = results.map((employee) => {
        return { name: employee.first_name, value: employee.id };
      });
      console.log(employeeList);
      const userInput = await inquirer.prompt([
        {
          type: "list",
          message: "What is the name of the employee you want to update?",
          name: "employeeId",
          choices: employeeList,
        },
        {
          name: "newRoleId",
          type: "input",
          message: "What is the new Role ID",
        },
      ]);
      const { employeeId, newRoleId } = userInput;
      console.log(employeeId);
      db.query(
        `UPDATE employee SET role_id = ? WHERE id = ?`,
        [newRoleId, employeeId],
        (err, results) => {
          if (err) throw err;
          else {
            console.table(results);
            question();
          }
        }
      );
    }
  });
};

// ---------------------- Update Employee Manager Function ---------------------------- //

const updateManager = async () => {
  db.query("SELECT first_name, id FROM employee", async (err, results) => {
    if (err) throw err;
    else {
      const employeeList = results.map((employee) => {
        return { name: employee.first_name, value: employee.id };
      });
      console.log(employeeList);
      const userInput = await inquirer.prompt([
        {
          type: "list",
          message: "What is the name of the employee you want to update?",
          name: "employeeId",
          choices: employeeList,
        },
        {
          name: "newManagerId",
          type: "input",
          message: "What is the new Manager ID",
        },
      ]);
      const { employeeId, newManagerId } = userInput;
      console.log(employeeId);
      db.query(
        `UPDATE employee SET manager_id = ? WHERE id = ?`,
        [newManagerId, employeeId],
        (err, results) => {
          if (err) throw err;
          else {
            console.table(results);
            question();
          }
        }
      );
    }
  });
};

// ----------------------View Employee by Manager Function ---------------------------- //

// const viewByManager = () => {
//   db.query(
//     `SELECT id,first_name, last_name,role_id AS worker FROM employee GROUP BY manager_id`,
//     (err, results) => {
//       if (err) throw err;
//       else {
//         console.table(results);
//         question();
//       }
//     }
//   );
const viewByManager = () => {
  db.query(
    "SELECT id, first_name, last_name, role_id FROM employee WHERE manager_id IS NULL",
    async (err, results) => {
      if (err) throw err;
      else {
        console.log(results);
      }
    }
  );

  //   db.query("SELECT manager_id,id FROM employee", async (err, results) => {
  //     if (err) throw err;
  //     else {
  //       const managerList = results.map((employee) => {
  //         return { name: employee.manager_id, value: employee.id };
  //       });
  //       console.log(managerList);
  //       const userInput = await inquirer.prompt([
  //         {
  //           type: "list",
  //           message: "What is the manager ID you want to view?",
  //           name: "viewByManager",
  //           choices: managerList,
  //         },
  //       ]);
  //       const { ViewByManager } = userInput;
  //       db.query(
  //         `SELECT first_name, last_name AS name FROM employee GROUP BY manager_id`,
  //         ViewByManager,
  //         (err, results) => {
  //           if (err) throw err;
  //           else {
  //             console.table(results);
  //             question();
  //           }
  //         }
  //       );
  //     }
  //   });
  // };
};

// ---------------------- Delete Function ---------------------------- //

const deleteData = async () => {
  const userInput = await inquirer.prompt([
    {
      type: "list",
      message: "What field do you want to delete?",
      name: "field",
      choices: ["department", "role", "employee"],
    },
    {
      name: "deleteId",
      type: "input",
      message:
        "Enter an ID value corresponding to the field you want to delete",
    },
  ]);
  const { field, deleteId } = userInput;
  db.query(`DELETE FROM ${field} WHERE id = ?`, deleteId, (err, results) => {
    if (err) throw err;
    console.table(results);
    question();
  });
};

// ---------------------- View By Budget Function ---------------------------- //

const viewBudget = async () => {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      message:
        "What is the departments ID you want to view the total budget of?",
      name: "budget",
    },
  ]);
  const { budget } = userInput;
  db.query(
    `SELECT SUM(salary) AS total_salary FROM role WHERE department_id = ?`,
    budget,
    (err, results) => {
      if (err) throw err;
      question();
      console.log(results);
    }
  );
  question();
};

// starts the prompt on load
question();
